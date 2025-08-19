import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { subjects } from '@/db/schema';
import { eq, like, or, desc, asc } from 'drizzle-orm';

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

      const subject = await db.select()
        .from(subjects)
        .where(eq(subjects.id, parseInt(id)))
        .limit(1);

      if (subject.length === 0) {
        return NextResponse.json({ 
          error: 'Subject not found' 
        }, { status: 404 });
      }

      return NextResponse.json(subject[0]);
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query = db.select().from(subjects);

    // Apply search filter
    if (search) {
      query = query.where(
        or(
          like(subjects.name, `%${search}%`),
          like(subjects.category, `%${search}%`)
        )
      );
    }

    // Apply sorting
    if (sort === 'name') {
      query = order === 'asc' ? query.orderBy(asc(subjects.name)) : query.orderBy(desc(subjects.name));
    } else if (sort === 'category') {
      query = order === 'asc' ? query.orderBy(asc(subjects.category)) : query.orderBy(desc(subjects.category));
    } else if (sort === 'difficultyLevel') {
      query = order === 'asc' ? query.orderBy(asc(subjects.difficultyLevel)) : query.orderBy(desc(subjects.difficultyLevel));
    } else {
      query = order === 'asc' ? query.orderBy(asc(subjects.createdAt)) : query.orderBy(desc(subjects.createdAt));
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
    const { name, category, difficultyLevel, description } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ 
        error: "Name is required",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!category || !category.trim()) {
      return NextResponse.json({ 
        error: "Category is required",
        code: "MISSING_CATEGORY" 
      }, { status: 400 });
    }

    if (!difficultyLevel || !difficultyLevel.trim()) {
      return NextResponse.json({ 
        error: "Difficulty level is required",
        code: "MISSING_DIFFICULTY_LEVEL" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      category: category.trim(),
      difficultyLevel: difficultyLevel.trim(),
      description: description ? description.trim() : null,
      createdAt: new Date().toISOString()
    };

    const newSubject = await db.insert(subjects)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newSubject[0], { status: 201 });
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
    const existing = await db.select()
      .from(subjects)
      .where(eq(subjects.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Subject not found' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { name, category, difficultyLevel, description } = body;

    // Build update object with only provided fields
    const updates: any = {};

    if (name !== undefined) {
      if (!name || !name.trim()) {
        return NextResponse.json({ 
          error: "Name cannot be empty",
          code: "INVALID_NAME" 
        }, { status: 400 });
      }
      updates.name = name.trim();
    }

    if (category !== undefined) {
      if (!category || !category.trim()) {
        return NextResponse.json({ 
          error: "Category cannot be empty",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
      updates.category = category.trim();
    }

    if (difficultyLevel !== undefined) {
      if (!difficultyLevel || !difficultyLevel.trim()) {
        return NextResponse.json({ 
          error: "Difficulty level cannot be empty",
          code: "INVALID_DIFFICULTY_LEVEL" 
        }, { status: 400 });
      }
      updates.difficultyLevel = difficultyLevel.trim();
    }

    if (description !== undefined) {
      updates.description = description ? description.trim() : null;
    }

    // If no fields to update
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ 
        error: "No fields to update",
        code: "NO_UPDATE_FIELDS" 
      }, { status: 400 });
    }

    const updated = await db.update(subjects)
      .set(updates)
      .where(eq(subjects.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
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
    const existing = await db.select()
      .from(subjects)
      .where(eq(subjects.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Subject not found' 
      }, { status: 404 });
    }

    const deleted = await db.delete(subjects)
      .where(eq(subjects.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Subject deleted successfully',
      deletedSubject: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}