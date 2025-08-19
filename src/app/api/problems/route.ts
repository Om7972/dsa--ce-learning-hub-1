import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { problems } from '@/db/schema';
import { eq, like, and, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const problem = await db.select()
        .from(problems)
        .where(eq(problems.id, parseInt(id)))
        .limit(1);

      if (problem.length === 0) {
        return NextResponse.json({ 
          error: 'Problem not found' 
        }, { status: 404 });
      }

      return NextResponse.json(problem[0]);
    }

    // List with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query = db.select().from(problems);
    
    // Build where conditions
    const conditions = [];
    
    if (search) {
      conditions.push(like(problems.title, `%${search}%`));
    }
    
    if (difficulty) {
      conditions.push(eq(problems.difficulty, difficulty));
    }
    
    if (category) {
      conditions.push(eq(problems.category, category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const sortColumn = sort === 'title' ? problems.title : 
                      sort === 'difficulty' ? problems.difficulty :
                      sort === 'category' ? problems.category :
                      problems.createdAt;

    if (order === 'asc') {
      query = query.orderBy(asc(sortColumn));
    } else {
      query = query.orderBy(desc(sortColumn));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
      return NextResponse.json({ 
        error: "Title is required and must be a non-empty string",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!body.description || typeof body.description !== 'string' || !body.description.trim()) {
      return NextResponse.json({ 
        error: "Description is required and must be a non-empty string",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }

    if (!body.difficulty || typeof body.difficulty !== 'string' || !body.difficulty.trim()) {
      return NextResponse.json({ 
        error: "Difficulty is required and must be a non-empty string",
        code: "MISSING_DIFFICULTY" 
      }, { status: 400 });
    }

    if (!body.category || typeof body.category !== 'string' || !body.category.trim()) {
      return NextResponse.json({ 
        error: "Category is required and must be a non-empty string",
        code: "MISSING_CATEGORY" 
      }, { status: 400 });
    }

    // Validate testCases if provided
    if (body.testCases && !Array.isArray(body.testCases)) {
      return NextResponse.json({ 
        error: "Test cases must be an array",
        code: "INVALID_TEST_CASES" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      title: body.title.trim(),
      description: body.description.trim(),
      difficulty: body.difficulty.trim(),
      category: body.category.trim(),
      solutionCode: body.solutionCode ? body.solutionCode.trim() : null,
      testCases: body.testCases || [],
      createdAt: new Date().toISOString()
    };

    const newProblem = await db.insert(problems)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newProblem[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existingProblem = await db.select()
      .from(problems)
      .where(eq(problems.id, parseInt(id)))
      .limit(1);

    if (existingProblem.length === 0) {
      return NextResponse.json({ 
        error: 'Problem not found' 
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and sanitize fields if provided
    if (body.title !== undefined) {
      if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
        return NextResponse.json({ 
          error: "Title must be a non-empty string",
          code: "INVALID_TITLE" 
        }, { status: 400 });
      }
      updates.title = body.title.trim();
    }

    if (body.description !== undefined) {
      if (!body.description || typeof body.description !== 'string' || !body.description.trim()) {
        return NextResponse.json({ 
          error: "Description must be a non-empty string",
          code: "INVALID_DESCRIPTION" 
        }, { status: 400 });
      }
      updates.description = body.description.trim();
    }

    if (body.difficulty !== undefined) {
      if (!body.difficulty || typeof body.difficulty !== 'string' || !body.difficulty.trim()) {
        return NextResponse.json({ 
          error: "Difficulty must be a non-empty string",
          code: "INVALID_DIFFICULTY" 
        }, { status: 400 });
      }
      updates.difficulty = body.difficulty.trim();
    }

    if (body.category !== undefined) {
      if (!body.category || typeof body.category !== 'string' || !body.category.trim()) {
        return NextResponse.json({ 
          error: "Category must be a non-empty string",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
      updates.category = body.category.trim();
    }

    if (body.solutionCode !== undefined) {
      updates.solutionCode = body.solutionCode ? body.solutionCode.trim() : null;
    }

    if (body.testCases !== undefined) {
      if (!Array.isArray(body.testCases)) {
        return NextResponse.json({ 
          error: "Test cases must be an array",
          code: "INVALID_TEST_CASES" 
        }, { status: 400 });
      }
      updates.testCases = body.testCases;
    }

    const updatedProblem = await db.update(problems)
      .set(updates)
      .where(eq(problems.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedProblem[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists
    const existingProblem = await db.select()
      .from(problems)
      .where(eq(problems.id, parseInt(id)))
      .limit(1);

    if (existingProblem.length === 0) {
      return NextResponse.json({ 
        error: 'Problem not found' 
      }, { status: 404 });
    }

    const deleted = await db.delete(problems)
      .where(eq(problems.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Problem deleted successfully',
      problem: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}