import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single project by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({
          error: "Valid ID is required",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      const project = await db.select()
        .from(projects)
        .where(eq(projects.id, parseInt(id)))
        .limit(1);

      if (project.length === 0) {
        return NextResponse.json({
          error: 'Project not found'
        }, { status: 404 });
      }

      return NextResponse.json(project[0]);
    }

    // List projects with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query: any = db.select().from(projects);

    // Build WHERE conditions
    const conditions = [];

    if (search) {
      conditions.push(like(projects.title, `%${search}%`));
    }

    if (difficulty) {
      conditions.push(eq(projects.difficulty, difficulty));
    }

    if (category) {
      conditions.push(eq(projects.category, category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add sorting
    const sortColumn = sort === 'title' ? projects.title : projects.createdAt;
    query = query.orderBy(order === 'asc' ? asc(sortColumn as any) : desc(sortColumn as any));

    // Add pagination
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
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({
        error: "Title is required",
        code: "MISSING_TITLE"
      }, { status: 400 });
    }

    if (!body.description || !body.description.trim()) {
      return NextResponse.json({
        error: "Description is required",
        code: "MISSING_DESCRIPTION"
      }, { status: 400 });
    }

    if (!body.difficulty || !body.difficulty.trim()) {
      return NextResponse.json({
        error: "Difficulty is required",
        code: "MISSING_DIFFICULTY"
      }, { status: 400 });
    }

    if (!body.category || !body.category.trim()) {
      return NextResponse.json({
        error: "Category is required",
        code: "MISSING_CATEGORY"
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      title: body.title.trim(),
      description: body.description.trim(),
      difficulty: body.difficulty.trim(),
      category: body.category.trim(),
      techStack: body.techStack || [],
      githubUrl: body.githubUrl ? body.githubUrl.trim() : null,
      demoUrl: body.demoUrl ? body.demoUrl.trim() : null,
      createdAt: new Date().toISOString()
    };

    const newProject = await db.insert(projects)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newProject[0], { status: 201 });
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

    // Check if project exists
    const existingProject = await db.select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)))
      .limit(1);

    if (existingProject.length === 0) {
      return NextResponse.json({
        error: 'Project not found'
      }, { status: 404 });
    }

    const body = await request.json();

    // Validate fields if provided
    if (body.title !== undefined && (!body.title || !body.title.trim())) {
      return NextResponse.json({
        error: "Title cannot be empty",
        code: "INVALID_TITLE"
      }, { status: 400 });
    }

    if (body.description !== undefined && (!body.description || !body.description.trim())) {
      return NextResponse.json({
        error: "Description cannot be empty",
        code: "INVALID_DESCRIPTION"
      }, { status: 400 });
    }

    if (body.difficulty !== undefined && (!body.difficulty || !body.difficulty.trim())) {
      return NextResponse.json({
        error: "Difficulty cannot be empty",
        code: "INVALID_DIFFICULTY"
      }, { status: 400 });
    }

    if (body.category !== undefined && (!body.category || !body.category.trim())) {
      return NextResponse.json({
        error: "Category cannot be empty",
        code: "INVALID_CATEGORY"
      }, { status: 400 });
    }

    // Prepare update data
    const updates: any = {};

    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.description !== undefined) updates.description = body.description.trim();
    if (body.difficulty !== undefined) updates.difficulty = body.difficulty.trim();
    if (body.category !== undefined) updates.category = body.category.trim();
    if (body.techStack !== undefined) updates.techStack = body.techStack;
    if (body.githubUrl !== undefined) updates.githubUrl = body.githubUrl ? body.githubUrl.trim() : null;
    if (body.demoUrl !== undefined) updates.demoUrl = body.demoUrl ? body.demoUrl.trim() : null;

    const updated = await db.update(projects)
      .set(updates)
      .where(eq(projects.id, parseInt(id)))
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

    // Check if project exists
    const existingProject = await db.select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)))
      .limit(1);

    if (existingProject.length === 0) {
      return NextResponse.json({
        error: 'Project not found'
      }, { status: 404 });
    }

    const deleted = await db.delete(projects)
      .where(eq(projects.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Project deleted successfully',
      project: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}