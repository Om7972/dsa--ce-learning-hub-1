import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { studySchedules, users, topics } from '@/db/schema';
import { eq, like, and, or, desc, asc, gte, lte } from 'drizzle-orm';

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
        .from(studySchedules)
        .where(eq(studySchedules.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ error: 'Study schedule not found' }, { status: 404 });
      }

      return NextResponse.json(record[0]);
    }

    // List with filtering and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId');
    const topicId = searchParams.get('topicId');
    const status = searchParams.get('status');
    const scheduledDateFrom = searchParams.get('scheduledDateFrom');
    const scheduledDateTo = searchParams.get('scheduledDateTo');
    const sort = searchParams.get('sort') || 'scheduledDate';
    const order = searchParams.get('order') || 'asc';

    let query = db.select().from(studySchedules);

    // Build where conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(studySchedules.status, `%${search}%`)
        )
      );
    }

    if (userId) {
      conditions.push(eq(studySchedules.userId, parseInt(userId)));
    }

    if (topicId) {
      conditions.push(eq(studySchedules.topicId, parseInt(topicId)));
    }

    if (status) {
      conditions.push(eq(studySchedules.status, status));
    }

    if (scheduledDateFrom) {
      conditions.push(gte(studySchedules.scheduledDate, scheduledDateFrom));
    }

    if (scheduledDateTo) {
      conditions.push(lte(studySchedules.scheduledDate, scheduledDateTo));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const sortColumn = studySchedules[sort as keyof typeof studySchedules] || studySchedules.scheduledDate;
    if (order === 'desc') {
      query = query.orderBy(desc(sortColumn));
    } else {
      query = query.orderBy(asc(sortColumn));
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
    if (!body.userId) {
      return NextResponse.json({ 
        error: "User ID is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!body.topicId) {
      return NextResponse.json({ 
        error: "Topic ID is required",
        code: "MISSING_TOPIC_ID" 
      }, { status: 400 });
    }

    if (!body.scheduledDate) {
      return NextResponse.json({ 
        error: "Scheduled date is required",
        code: "MISSING_SCHEDULED_DATE" 
      }, { status: 400 });
    }

    if (!body.durationMinutes) {
      return NextResponse.json({ 
        error: "Duration in minutes is required",
        code: "MISSING_DURATION_MINUTES" 
      }, { status: 400 });
    }

    // Validate IDs are numbers
    if (isNaN(parseInt(body.userId))) {
      return NextResponse.json({ 
        error: "Valid user ID is required",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(body.topicId))) {
      return NextResponse.json({ 
        error: "Valid topic ID is required",
        code: "INVALID_TOPIC_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(body.durationMinutes)) || parseInt(body.durationMinutes) <= 0) {
      return NextResponse.json({ 
        error: "Valid duration in minutes is required",
        code: "INVALID_DURATION_MINUTES" 
      }, { status: 400 });
    }

    // Check if user exists
    const userExists = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(body.userId)))
      .limit(1);

    if (userExists.length === 0) {
      return NextResponse.json({ 
        error: "User not found",
        code: "USER_NOT_FOUND" 
      }, { status: 400 });
    }

    // Check if topic exists
    const topicExists = await db.select()
      .from(topics)
      .where(eq(topics.id, parseInt(body.topicId)))
      .limit(1);

    if (topicExists.length === 0) {
      return NextResponse.json({ 
        error: "Topic not found",
        code: "TOPIC_NOT_FOUND" 
      }, { status: 400 });
    }

    // Prepare data for insertion
    const studyScheduleData = {
      userId: parseInt(body.userId),
      topicId: parseInt(body.topicId),
      scheduledDate: body.scheduledDate.trim(),
      durationMinutes: parseInt(body.durationMinutes),
      status: body.status?.trim() || 'scheduled'
    };

    const newRecord = await db.insert(studySchedules)
      .values(studyScheduleData)
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
      .from(studySchedules)
      .where(eq(studySchedules.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Study schedule not found' }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and prepare updates
    if (body.userId !== undefined) {
      if (isNaN(parseInt(body.userId))) {
        return NextResponse.json({ 
          error: "Valid user ID is required",
          code: "INVALID_USER_ID" 
        }, { status: 400 });
      }

      // Check if user exists
      const userExists = await db.select()
        .from(users)
        .where(eq(users.id, parseInt(body.userId)))
        .limit(1);

      if (userExists.length === 0) {
        return NextResponse.json({ 
          error: "User not found",
          code: "USER_NOT_FOUND" 
        }, { status: 400 });
      }

      updates.userId = parseInt(body.userId);
    }

    if (body.topicId !== undefined) {
      if (isNaN(parseInt(body.topicId))) {
        return NextResponse.json({ 
          error: "Valid topic ID is required",
          code: "INVALID_TOPIC_ID" 
        }, { status: 400 });
      }

      // Check if topic exists
      const topicExists = await db.select()
        .from(topics)
        .where(eq(topics.id, parseInt(body.topicId)))
        .limit(1);

      if (topicExists.length === 0) {
        return NextResponse.json({ 
          error: "Topic not found",
          code: "TOPIC_NOT_FOUND" 
        }, { status: 400 });
      }

      updates.topicId = parseInt(body.topicId);
    }

    if (body.scheduledDate !== undefined) {
      if (!body.scheduledDate.trim()) {
        return NextResponse.json({ 
          error: "Scheduled date is required",
          code: "MISSING_SCHEDULED_DATE" 
        }, { status: 400 });
      }
      updates.scheduledDate = body.scheduledDate.trim();
    }

    if (body.durationMinutes !== undefined) {
      if (isNaN(parseInt(body.durationMinutes)) || parseInt(body.durationMinutes) <= 0) {
        return NextResponse.json({ 
          error: "Valid duration in minutes is required",
          code: "INVALID_DURATION_MINUTES" 
        }, { status: 400 });
      }
      updates.durationMinutes = parseInt(body.durationMinutes);
    }

    if (body.status !== undefined) {
      updates.status = body.status.trim();
    }

    const updated = await db.update(studySchedules)
      .set(updates)
      .where(eq(studySchedules.id, parseInt(id)))
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
      .from(studySchedules)
      .where(eq(studySchedules.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Study schedule not found' }, { status: 404 });
    }

    const deleted = await db.delete(studySchedules)
      .where(eq(studySchedules.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Study schedule deleted successfully',
      deletedRecord: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}