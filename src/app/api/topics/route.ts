import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { topics, subjects } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Single topic by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const topic = await db.select()
        .from(topics)
        .where(eq(topics.id, parseInt(id)))
        .limit(1);

      if (topic.length === 0) {
        return NextResponse.json({ 
          error: 'Topic not found' 
        }, { status: 404 });
      }

      return NextResponse.json(topic[0]);
    }

    // List topics with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const subjectId = searchParams.get('subjectId');
    const sort = searchParams.get('sort') || 'orderIndex';
    const order = searchParams.get('order') || 'asc';

    let query = db.select().from(topics);
    
    const conditions = [];
    
    if (search) {
      conditions.push(like(topics.name, `%${search}%`));
    }
    
    if (subjectId && !isNaN(parseInt(subjectId))) {
      conditions.push(eq(topics.subjectId, parseInt(subjectId)));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Add sorting
    const sortColumn = sort === 'name' ? topics.name : 
                      sort === 'estimatedHours' ? topics.estimatedHours :
                      topics.orderIndex;
    
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
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json({ 
        error: "Name is required and must be a string",
        code: "MISSING_NAME" 
      }, { status: 400 });
    }

    if (!body.subjectId || isNaN(parseInt(body.subjectId))) {
      return NextResponse.json({ 
        error: "Valid subjectId is required",
        code: "MISSING_SUBJECT_ID" 
      }, { status: 400 });
    }

    if (body.orderIndex === undefined || isNaN(parseInt(body.orderIndex))) {
      return NextResponse.json({ 
        error: "Valid orderIndex is required",
        code: "MISSING_ORDER_INDEX" 
      }, { status: 400 });
    }

    if (!body.estimatedHours || isNaN(parseInt(body.estimatedHours))) {
      return NextResponse.json({ 
        error: "Valid estimatedHours is required",
        code: "MISSING_ESTIMATED_HOURS" 
      }, { status: 400 });
    }

    // Verify subject exists
    const subjectExists = await db.select()
      .from(subjects)
      .where(eq(subjects.id, parseInt(body.subjectId)))
      .limit(1);

    if (subjectExists.length === 0) {
      return NextResponse.json({ 
        error: "Subject not found",
        code: "SUBJECT_NOT_FOUND" 
      }, { status: 400 });
    }

    // Prepare data
    const topicData = {
      subjectId: parseInt(body.subjectId),
      name: body.name.trim(),
      description: body.description ? body.description.trim() : null,
      orderIndex: parseInt(body.orderIndex),
      estimatedHours: parseInt(body.estimatedHours)
    };

    const newTopic = await db.insert(topics)
      .values(topicData)
      .returning();

    return NextResponse.json(newTopic[0], { status: 201 });
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

    const body = await request.json();

    // Check if topic exists
    const existingTopic = await db.select()
      .from(topics)
      .where(eq(topics.id, parseInt(id)))
      .limit(1);

    if (existingTopic.length === 0) {
      return NextResponse.json({ 
        error: 'Topic not found' 
      }, { status: 404 });
    }

    // Validate fields if provided
    if (body.name !== undefined && (!body.name || typeof body.name !== 'string')) {
      return NextResponse.json({ 
        error: "Name must be a non-empty string",
        code: "INVALID_NAME" 
      }, { status: 400 });
    }

    if (body.subjectId !== undefined) {
      if (isNaN(parseInt(body.subjectId))) {
        return NextResponse.json({ 
          error: "SubjectId must be a valid integer",
          code: "INVALID_SUBJECT_ID" 
        }, { status: 400 });
      }

      // Verify subject exists
      const subjectExists = await db.select()
        .from(subjects)
        .where(eq(subjects.id, parseInt(body.subjectId)))
        .limit(1);

      if (subjectExists.length === 0) {
        return NextResponse.json({ 
          error: "Subject not found",
          code: "SUBJECT_NOT_FOUND" 
        }, { status: 400 });
      }
    }

    if (body.orderIndex !== undefined && isNaN(parseInt(body.orderIndex))) {
      return NextResponse.json({ 
        error: "OrderIndex must be a valid integer",
        code: "INVALID_ORDER_INDEX" 
      }, { status: 400 });
    }

    if (body.estimatedHours !== undefined && isNaN(parseInt(body.estimatedHours))) {
      return NextResponse.json({ 
        error: "EstimatedHours must be a valid integer",
        code: "INVALID_ESTIMATED_HOURS" 
      }, { status: 400 });
    }

    // Prepare update data
    const updates: any = {};
    
    if (body.name !== undefined) {
      updates.name = body.name.trim();
    }
    
    if (body.subjectId !== undefined) {
      updates.subjectId = parseInt(body.subjectId);
    }
    
    if (body.description !== undefined) {
      updates.description = body.description ? body.description.trim() : null;
    }
    
    if (body.orderIndex !== undefined) {
      updates.orderIndex = parseInt(body.orderIndex);
    }
    
    if (body.estimatedHours !== undefined) {
      updates.estimatedHours = parseInt(body.estimatedHours);
    }

    const updatedTopic = await db.update(topics)
      .set(updates)
      .where(eq(topics.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedTopic[0]);
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

    // Check if topic exists
    const existingTopic = await db.select()
      .from(topics)
      .where(eq(topics.id, parseInt(id)))
      .limit(1);

    if (existingTopic.length === 0) {
      return NextResponse.json({ 
        error: 'Topic not found' 
      }, { status: 404 });
    }

    const deletedTopic = await db.delete(topics)
      .where(eq(topics.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Topic deleted successfully',
      topic: deletedTopic[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}