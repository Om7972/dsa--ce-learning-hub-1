import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userSubmissions, users, problems } from '@/db/schema';
import { eq, like, and, or, desc, asc, SQL } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({
          error: "Valid ID is required",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      const record = await db.select()
        .from(userSubmissions)
        .where(eq(userSubmissions.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ error: 'User submission not found' }, { status: 404 });
      }

      return NextResponse.json(record[0]);
    }

    // List with filters and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId');
    const problemId = searchParams.get('problemId');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'submittedAt';
    const order = searchParams.get('order') || 'desc';

    let query: any = db.select().from(userSubmissions);

    // Build where conditions
    const conditions: SQL[] = [];

    if (search) {
      const titleSearch = like(userSubmissions.code, `%${search}%`);
      const statusSearch = like(userSubmissions.status, `%${search}%`);
      if (titleSearch && statusSearch) {
        conditions.push(or(titleSearch, statusSearch)!);
      }
    }

    if (userId && !isNaN(parseInt(userId))) {
      conditions.push(eq(userSubmissions.userId, parseInt(userId)));
    }

    if (problemId && !isNaN(parseInt(problemId))) {
      conditions.push(eq(userSubmissions.problemId, parseInt(problemId)));
    }

    if (status) {
      conditions.push(eq(userSubmissions.status, status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const sortColumn = (userSubmissions[sort as keyof typeof userSubmissions] || userSubmissions.submittedAt) as any;
    query = query.orderBy(order === 'asc' ? asc(sortColumn) : desc(sortColumn));

    // Apply pagination
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
    const { userId, problemId, code, status } = body;

    // Validate required fields
    if (!userId) {
      return NextResponse.json({
        error: "userId is required",
        code: "MISSING_REQUIRED_FIELD"
      }, { status: 400 });
    }

    if (!problemId) {
      return NextResponse.json({
        error: "problemId is required",
        code: "MISSING_REQUIRED_FIELD"
      }, { status: 400 });
    }

    if (!code || typeof code !== 'string') {
      return NextResponse.json({
        error: "code is required and must be a string",
        code: "MISSING_REQUIRED_FIELD"
      }, { status: 400 });
    }

    // Validate IDs are valid integers
    if (isNaN(parseInt(userId))) {
      return NextResponse.json({
        error: "userId must be a valid integer",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    if (isNaN(parseInt(problemId))) {
      return NextResponse.json({
        error: "problemId must be a valid integer",
        code: "INVALID_ID"
      }, { status: 400 });
    }

    // Check if referenced user exists
    const userExists = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(userId)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json({
        error: "Referenced user does not exist",
        code: "INVALID_FOREIGN_KEY"
      }, { status: 400 });
    }

    // Check if referenced problem exists
    const problemExists = await db.select()
      .from(problems)
      .where(eq(problems.id, parseInt(problemId)))
      .limit(1);

    if (problemExists.length === 0) {
      return NextResponse.json({
        error: "Referenced problem does not exist",
        code: "INVALID_FOREIGN_KEY"
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedCode = code.trim();
    const submissionStatus = status?.trim() || 'pending';

    // Create new user submission
    const newRecord = await db.insert(userSubmissions)
      .values({
        userId: parseInt(userId),
        problemId: parseInt(problemId),
        code: sanitizedCode,
        status: submissionStatus,
        submittedAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });
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
    const existingRecord = await db.select()
      .from(userSubmissions)
      .where(eq(userSubmissions.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'User submission not found' }, { status: 404 });
    }

    const body = await request.json();
    const { userId, problemId, code, status } = body;
    const updates: any = {};

    // Validate and prepare updates
    if (userId !== undefined) {
      if (isNaN(parseInt(userId))) {
        return NextResponse.json({
          error: "userId must be a valid integer",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      // Check if referenced user exists
      const userExists = await db.select()
        .from(users)
        .where(eq(users.id, parseInt(userId)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json({
          error: "Referenced user does not exist",
          code: "INVALID_FOREIGN_KEY"
        }, { status: 400 });
      }

      updates.userId = parseInt(userId);
    }

    if (problemId !== undefined) {
      if (isNaN(parseInt(problemId))) {
        return NextResponse.json({
          error: "problemId must be a valid integer",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      // Check if referenced problem exists
      const problemExists = await db.select()
        .from(problems)
        .where(eq(problems.id, parseInt(problemId)))
        .limit(1);

      if (problemExists.length === 0) {
        return NextResponse.json({
          error: "Referenced problem does not exist",
          code: "INVALID_FOREIGN_KEY"
        }, { status: 400 });
      }

      updates.problemId = parseInt(problemId);
    }

    if (code !== undefined) {
      if (typeof code !== 'string') {
        return NextResponse.json({
          error: "code must be a string",
          code: "INVALID_FIELD_TYPE"
        }, { status: 400 });
      }
      updates.code = code.trim();
    }

    if (status !== undefined) {
      if (typeof status !== 'string') {
        return NextResponse.json({
          error: "status must be a string",
          code: "INVALID_FIELD_TYPE"
        }, { status: 400 });
      }
      updates.status = status.trim();
    }

    // Update the record
    const updated = await db.update(userSubmissions)
      .set(updates)
      .where(eq(userSubmissions.id, parseInt(id)))
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
    const existingRecord = await db.select()
      .from(userSubmissions)
      .where(eq(userSubmissions.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'User submission not found' }, { status: 404 });
    }

    // Delete the record
    const deleted = await db.delete(userSubmissions)
      .where(eq(userSubmissions.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'User submission deleted successfully',
      deletedRecord: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}