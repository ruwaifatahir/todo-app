import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();

  const { rows } = await client.sql`SELECT * FROM todo_list;`;

  return NextResponse.json({ rows });
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const description = searchParams.get("description");

  const client = await db.connect();
  console.log(description);
  try {
    await client.sql`INSERT INTO todo_list (task_description, is_completed)
VALUES (${description}, FALSE);`;
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }

  const { rows } = await client.sql`SELECT * FROM todo_list;`;

  return NextResponse.json({ rows });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const client = await db.connect();

  try {
    await client.sql`DELETE FROM todo_list WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }

  const { rows } = await client.sql`SELECT * FROM todo_list;`;

  return NextResponse.json({ rows });
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const client = await db.connect();

  try {
    await client.sql`UPDATE todo_list SET is_completed = TRUE WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }

  const { rows } = await client.sql`SELECT * FROM todo_list;`;

  return NextResponse.json({ rows });
}
