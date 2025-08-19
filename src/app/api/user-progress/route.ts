import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userProgress, users, topics } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

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

      const record = await db.select()
        .from(userProgress)
        .where(eq(userProgress.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ 
          error: 'User progress record not found' 
        }, { status: 404 });
      }

      return NextResponse.json(record[0]);
    }

    // List with filters, pagination, and sorting
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId');
    const topicId = searchParams.get('topicId');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'id';
    const order = searchParams.get('order') || 'desc';

    let query = db.select().from(userProgress);

    // Build where conditions
    const conditions = [];
    
    if (userId && !isNaN(parseInt(userId))) {
      conditions.push(eq(userProgress.userId, parseInt(userId)));
    }
    
    if (topicId && !isNaN(parseInt(topicId))) {
      conditions.push(eq(userProgress.topicId, parseInt(topicId)));
    }
    
    if (status) {
      conditions.push(eq(userProgress.status, status));
    }

    if (search) {
      conditions.push(
        or(
          like(userProgress.status, `%${search}%`),
          like(userProgress.completionDate, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const orderDirection = order === 'asc' ? asc : desc;
    if (sort === 'userId') {
      query = query.orderBy(orderDirection(userProgress.userId));
    } else if (sort === 'topicId') {
      query = query.orderBy(orderDirection(userProgress.topicId));
    } else if (sort === 'status') {
      query = query.orderBy(orderDirection(userProgress.status));
    } else if (sort === 'completionDate') {
      query = query.orderBy(orderDirection(userProgress.completionDate));
    } else {
      query = query.orderBy(orderDirection(userProgress.id));
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
        error: "userId is required",
        code: "MISSING_USER_ID" 
      }, { status: 400 });
    }

    if (!body.topicId) {
      return NextResponse.json({ 
        error: "topicId is required",
        code: "MISSING_TOPIC_ID" 
      }, { status: 400 });
    }

    // Validate IDs are valid integers
    if (isNaN(parseInt(body.userId))) {
      return NextResponse.json({ 
        error: "Valid userId is required",
        code: "INVALID_USER_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(body.topicId))) {
      return NextResponse.json({ 
        error: "Valid topicId is required",
        code: "INVALID_TOPIC_ID" 
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
    const newProgressData = {
      userId: parseInt(body.userId),
      topicId: parseInt(body.topicId),
      status: body.status || 'not_started',
      completionDate: body.status === 'completed' ? new Date().toISOString() : body.completionDate || null
    };

    const newRecord = await db.insert(userProgress)
      .values(newProgressData)
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
      .from(userProgress)
      .where(eq(userProgress.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: 'User progress record not found' 
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate userId if provided
    if (body.userId !== undefined) {
      if (isNaN(parseInt(body.userId))) {
        return NextResponse.json({ 
          error: "Valid userId is required",
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

    // Validate topicId if provided
    if (body.topicId !== undefined) {
      if (isNaN(parseInt(body.topicId))) {
        return NextResponse.json({ 
          error: "Valid topicId is required",
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

    // Handle status update
    if (body.status !== undefined) {
      updates.status = body.status;
      
      // Auto-set completion date when status changes to completed
      if (body.status === 'completed' && !body.completionDate) {
        updates.completionDate = new Date().toISOString();
      } else if (body.status !== 'completed') {
        updates.completionDate = null;
      }
    }

    // Handle completion date if explicitly provided
    if (body.completionDate !== undefined) {
      updates.completionDate = body.completionDate;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ 
        error: "No valid fields to update",
        code: "NO_UPDATES" 
      }, { status: 400 });
    }

    const updated = await db.update(userProgress)
      .set(updates)
      .where(eq(userProgress.id, parseInt(id)))
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
      .from(userProgress)
      .where(eq(userProgress.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: 'User progress record not found' 
      }, { status: 404 });
    }

    const deleted = await db.delete(userProgress)
      .where(eq(userProgress.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'User progress record deleted successfully',
      deletedRecord: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}