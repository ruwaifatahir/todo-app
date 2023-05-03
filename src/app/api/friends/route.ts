import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await db.connect();

  try {
    await client.sql`CREATE TABLE Friend ( Name varchar(255), Age int, NickName varchar(255));`;

    const names = [
      {
        name: "Salman Zahid",
        age: 21,
        nickname: "Muskan",
      },

      {
        name: "Hammad Nadeem",
        age: 22,
        nickname: "Munni",
      },

      {
        name: "Ruwaifa Tahir",
        age: 21,
        nickname: "mithu",
      },

      {
        name: "Khubaib Fayyaz",
        age: 20,
        nickname: "Pari",
      },
    ];

    names.forEach(
      async ({ name, age, nickname }) =>
        await client.sql`INSERT INTO Friend (Name, Age, NickName) VALUES (${name}, ${age}, ${nickname});`
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }

  const { rows } = await client.sql`SELECT * FROM Friend;`;
  return NextResponse.json({ rows });
}
