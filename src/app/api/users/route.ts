import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, like, or, desc, asc, SQL } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single user fetch by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({
          error: "Valid ID is required",
          code: "INVALID_ID"
        }, { status: 400 });
      }

      const user = await db.select()
        .from(users)
        .where(eq(users.id, parseInt(id)))
        .limit(1);

      if (user.length === 0) {
        return NextResponse.json({
          error: 'User not found'
        }, { status: 404 });
      }

      return NextResponse.json(user[0]);
    }

    // List users with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query: any = db.select().from(users);

    // Apply search filter
    if (search) {
      query = query.where(
        or(
          like(users.name, `%${search}%`),
          like(users.email, `%${search}%`)
        )
      );
    }

    // Apply sorting
    if (sort === 'name') {
      query = order === 'asc' ? query.orderBy(asc(users.name)) : query.orderBy(desc(users.name));
    } else if (sort === 'email') {
      query = order === 'asc' ? query.orderBy(asc(users.email)) : query.orderBy(desc(users.email));
    } else if (sort === 'role') {
      query = order === 'asc' ? query.orderBy(asc(users.role)) : query.orderBy(desc(users.role));
    } else {
      query = order === 'asc' ? query.orderBy(asc(users.createdAt)) : query.orderBy(desc(users.createdAt));
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
    if (!body.email) {
      return NextResponse.json({
        error: "Email is required",
        code: "MISSING_EMAIL"
      }, { status: 400 });
    }

    if (!body.name) {
      return NextResponse.json({
        error: "Name is required",
        code: "MISSING_NAME"
      }, { status: 400 });
    }

    if (!body.passwordHash) {
      return NextResponse.json({
        error: "Password hash is required",
        code: "MISSING_PASSWORD_HASH"
      }, { status: 400 });
    }

    // Sanitize inputs
    const email = body.email.trim().toLowerCase();
    const name = body.name.trim();
    const passwordHash = body.passwordHash.trim();
    const role = body.role?.trim() || 'student';

    // Check if email is unique
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json({
        error: "Email already exists",
        code: "EMAIL_EXISTS"
      }, { status: 400 });
    }

    // Create new user
    const newUser = await db.insert(users)
      .values({
        email,
        name,
        passwordHash,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newUser[0], { status: 201 });

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

    // Check if user exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    // Validate and sanitize fields if provided
    if (body.email !== undefined) {
      if (!body.email.trim()) {
        return NextResponse.json({
          error: "Email cannot be empty",
          code: "INVALID_EMAIL"
        }, { status: 400 });
      }

      const email = body.email.trim().toLowerCase();

      // Check if email is unique (excluding current user)
      const emailExists = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (emailExists.length > 0 && emailExists[0].id !== parseInt(id)) {
        return NextResponse.json({
          error: "Email already exists",
          code: "EMAIL_EXISTS"
        }, { status: 400 });
      }

      updates.email = email;
    }

    if (body.name !== undefined) {
      if (!body.name.trim()) {
        return NextResponse.json({
          error: "Name cannot be empty",
          code: "INVALID_NAME"
        }, { status: 400 });
      }
      updates.name = body.name.trim();
    }

    if (body.passwordHash !== undefined) {
      if (!body.passwordHash.trim()) {
        return NextResponse.json({
          error: "Password hash cannot be empty",
          code: "INVALID_PASSWORD_HASH"
        }, { status: 400 });
      }
      updates.passwordHash = body.passwordHash.trim();
    }

    if (body.role !== undefined) {
      updates.role = body.role.trim() || 'student';
    }

    // Update user
    const updated = await db.update(users)
      .set(updates)
      .where(eq(users.id, parseInt(id)))
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

    // Check if user exists
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.id, parseInt(id)))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 404 });
    }

    // Delete user
    const deleted = await db.delete(users)
      .where(eq(users.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'User deleted successfully',
      user: deleted[0]
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + error
    }, { status: 500 });
  }
}