import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { careerPaths } from '@/db/schema';
import { eq, like, or, desc, asc } from 'drizzle-orm';

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
        .from(careerPaths)
        .where(eq(careerPaths.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({
          error: 'Career path not found'
        }, { status: 404 });
      }

      return NextResponse.json(record[0]);
    }

    // List with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query: any = db.select().from(careerPaths);

    // Apply search filter
    if (search) {
      query = query.where(
        or(
          like(careerPaths.title, `%${search}%`),
          like(careerPaths.description, `%${search}%`)
        )
      );
    }

    // Apply sorting
    const sortField = sort === 'title' ? careerPaths.title : careerPaths.createdAt;
    query = query.orderBy(order === 'asc' ? asc(sortField as any) : desc(sortField as any));

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

    if (!body.salaryRange || typeof body.salaryRange !== 'string' || !body.salaryRange.trim()) {
      return NextResponse.json({
        error: "Salary range is required and must be a non-empty string",
        code: "MISSING_SALARY_RANGE"
      }, { status: 400 });
    }

    // Validate JSON fields
    let requirements = [];
    let skillsNeeded = [];

    if (body.requirements) {
      if (!Array.isArray(body.requirements)) {
        return NextResponse.json({
          error: "Requirements must be an array",
          code: "INVALID_REQUIREMENTS"
        }, { status: 400 });
      }
      requirements = body.requirements;
    }

    if (body.skillsNeeded) {
      if (!Array.isArray(body.skillsNeeded)) {
        return NextResponse.json({
          error: "Skills needed must be an array",
          code: "INVALID_SKILLS_NEEDED"
        }, { status: 400 });
      }
      skillsNeeded = body.skillsNeeded;
    }

    // Create new career path
    const newCareerPath = await db.insert(careerPaths)
      .values({
        title: body.title.trim(),
        description: body.description.trim(),
        salaryRange: body.salaryRange.trim(),
        requirements: requirements,
        skillsNeeded: skillsNeeded,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newCareerPath[0], { status: 201 });
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
      .from(careerPaths)
      .where(eq(careerPaths.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({
        error: 'Career path not found'
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and set fields if provided
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || !body.title.trim()) {
        return NextResponse.json({
          error: "Title must be a non-empty string",
          code: "INVALID_TITLE"
        }, { status: 400 });
      }
      updates.title = body.title.trim();
    }

    if (body.description !== undefined) {
      if (typeof body.description !== 'string' || !body.description.trim()) {
        return NextResponse.json({
          error: "Description must be a non-empty string",
          code: "INVALID_DESCRIPTION"
        }, { status: 400 });
      }
      updates.description = body.description.trim();
    }

    if (body.salaryRange !== undefined) {
      if (typeof body.salaryRange !== 'string' || !body.salaryRange.trim()) {
        return NextResponse.json({
          error: "Salary range must be a non-empty string",
          code: "INVALID_SALARY_RANGE"
        }, { status: 400 });
      }
      updates.salaryRange = body.salaryRange.trim();
    }

    if (body.requirements !== undefined) {
      if (!Array.isArray(body.requirements)) {
        return NextResponse.json({
          error: "Requirements must be an array",
          code: "INVALID_REQUIREMENTS"
        }, { status: 400 });
      }
      updates.requirements = body.requirements;
    }

    if (body.skillsNeeded !== undefined) {
      if (!Array.isArray(body.skillsNeeded)) {
        return NextResponse.json({
          error: "Skills needed must be an array",
          code: "INVALID_SKILLS_NEEDED"
        }, { status: 400 });
      }
      updates.skillsNeeded = body.skillsNeeded;
    }

    // Always update timestamp
    updates.updatedAt = new Date().toISOString();

    const updated = await db.update(careerPaths)
      .set(updates)
      .where(eq(careerPaths.id, parseInt(id)))
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
      .from(careerPaths)
      .where(eq(careerPaths.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({
        error: 'Career path not found'
      }, { status: 404 });
    }

    const deleted = await db.delete(careerPaths)
      .where(eq(careerPaths.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Career path deleted successfully',
      deletedRecord: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}