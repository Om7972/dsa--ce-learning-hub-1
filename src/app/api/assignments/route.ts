import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { assignments, subjects } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single assignment by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({
          error: "Valid ID is required",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      const assignment = await db.select()
        .from(assignments)
        .where(eq(assignments.id, parseInt(id)))
        .limit(1);

      if (assignment.length === 0) {
        return NextResponse.json({
          error: 'Assignment not found'
        }, { status: 404 });
      }

      return NextResponse.json(assignment[0]);
    }

    // List assignments with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const subjectId = searchParams.get('subjectId');
    const difficulty = searchParams.get('difficulty');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query: any = db.select().from(assignments);

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(like(assignments.title, `%${search}%`));
    }

    if (subjectId && !isNaN(parseInt(subjectId))) {
      conditions.push(eq(assignments.subjectId, parseInt(subjectId)));
    }

    if (difficulty) {
      conditions.push(eq(assignments.difficulty, difficulty));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add sorting
    const sortColumn = assignments[sort as keyof typeof assignments] || assignments.createdAt;
    if (order === 'asc') {
      query = query.orderBy(asc(sortColumn as any));
    } else {
      query = query.orderBy(desc(sortColumn as any));
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
    if (!body.subjectId) {
      return NextResponse.json({
        error: "Subject ID is required",
        code: "MISSING_SUBJECT_ID"
      }, { status: 400 });
    }

    if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
      return NextResponse.json({
        error: "Title is required",
        code: "MISSING_TITLE"
      }, { status: 400 });
    }

    if (!body.difficulty || typeof body.difficulty !== 'string' || !body.difficulty.trim()) {
      return NextResponse.json({
        error: "Difficulty is required",
        code: "MISSING_DIFFICULTY"
      }, { status: 400 });
    }

    if (!body.dueDate || typeof body.dueDate !== 'string' || !body.dueDate.trim()) {
      return NextResponse.json({
        error: "Due date is required",
        code: "MISSING_DUE_DATE"
      }, { status: 400 });
    }

    if (body.points === undefined || body.points === null || isNaN(parseInt(body.points))) {
      return NextResponse.json({
        error: "Points is required and must be a number",
        code: "MISSING_POINTS"
      }, { status: 400 });
    }

    // Validate subjectId is a valid integer
    if (isNaN(parseInt(body.subjectId))) {
      return NextResponse.json({
        error: "Subject ID must be a valid number",
        code: "INVALID_SUBJECT_ID"
      }, { status: 400 });
    }

    // Check if subject exists
    const subject = await db.select()
      .from(subjects)
      .where(eq(subjects.id, parseInt(body.subjectId)))
      .limit(1);

    if (subject.length === 0) {
      return NextResponse.json({
        error: "Referenced subject does not exist",
        code: "SUBJECT_NOT_FOUND"
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      subjectId: parseInt(body.subjectId),
      title: body.title.trim(),
      description: body.description ? body.description.trim() : null,
      difficulty: body.difficulty.trim(),
      dueDate: body.dueDate.trim(),
      points: parseInt(body.points),
      createdAt: new Date().toISOString()
    };

    const newAssignment = await db.insert(assignments)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newAssignment[0], { status: 201 });

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

    // Check if assignment exists
    const existingAssignment = await db.select()
      .from(assignments)
      .where(eq(assignments.id, parseInt(id)))
      .limit(1);

    if (existingAssignment.length === 0) {
      return NextResponse.json({
        error: 'Assignment not found'
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and sanitize fields if provided
    if (body.subjectId !== undefined) {
      if (isNaN(parseInt(body.subjectId))) {
        return NextResponse.json({
          error: "Subject ID must be a valid number",
          code: "INVALID_SUBJECT_ID"
        }, { status: 400 });
      }

      // Check if subject exists
      const subject = await db.select()
        .from(subjects)
        .where(eq(subjects.id, parseInt(body.subjectId)))
        .limit(1);

      if (subject.length === 0) {
        return NextResponse.json({
          error: "Referenced subject does not exist",
          code: "SUBJECT_NOT_FOUND"
        }, { status: 400 });
      }

      updates.subjectId = parseInt(body.subjectId);
    }

    if (body.title !== undefined) {
      if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
        return NextResponse.json({
          error: "Title cannot be empty",
          code: "INVALID_TITLE"
        }, { status: 400 });
      }
      updates.title = body.title.trim();
    }

    if (body.description !== undefined) {
      updates.description = body.description ? body.description.trim() : null;
    }

    if (body.difficulty !== undefined) {
      if (!body.difficulty || typeof body.difficulty !== 'string' || !body.difficulty.trim()) {
        return NextResponse.json({
          error: "Difficulty cannot be empty",
          code: "INVALID_DIFFICULTY"
        }, { status: 400 });
      }
      updates.difficulty = body.difficulty.trim();
    }

    if (body.dueDate !== undefined) {
      if (!body.dueDate || typeof body.dueDate !== 'string' || !body.dueDate.trim()) {
        return NextResponse.json({
          error: "Due date cannot be empty",
          code: "INVALID_DUE_DATE"
        }, { status: 400 });
      }
      updates.dueDate = body.dueDate.trim();
    }

    if (body.points !== undefined) {
      if (isNaN(parseInt(body.points))) {
        return NextResponse.json({
          error: "Points must be a valid number",
          code: "INVALID_POINTS"
        }, { status: 400 });
      }
      updates.points = parseInt(body.points);
    }

    const updatedAssignment = await db.update(assignments)
      .set(updates)
      .where(eq(assignments.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedAssignment[0]);

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

    // Check if assignment exists
    const existingAssignment = await db.select()
      .from(assignments)
      .where(eq(assignments.id, parseInt(id)))
      .limit(1);

    if (existingAssignment.length === 0) {
      return NextResponse.json({
        error: 'Assignment not found'
      }, { status: 404 });
    }

    const deletedAssignment = await db.delete(assignments)
      .where(eq(assignments.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Assignment deleted successfully',
      assignment: deletedAssignment[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}