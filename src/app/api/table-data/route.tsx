// app/api/table-data/route.ts
import { NextResponse } from "next/server";

interface TableRow {
  id: number;
  name: string;
  post: string; // note we store a post as a string now
}

// Simple in-memory data (sample)
let nextId = 1;
const tableData: TableRow[] = [];

// GET
export async function GET() {
  return NextResponse.json({ data: tableData }, { status: 200 });
}

// POST - add a new row
export async function POST(request: Request) {
  try {
    const { name, post } = await request.json();
    if (!name || !post) {
      return NextResponse.json({ error: "Missing 'name' or 'post'." }, { status: 400 });
    }
    const newRow: TableRow = {
      id: nextId++,
      name,
      post,
    };
    tableData.push(newRow);
    return NextResponse.json({ success: true, data: tableData }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// PUT - update a row
export async function PUT(request: Request) {
  try {
    const { id, name, post } = await request.json();
    if (!id || !name || !post) {
      return NextResponse.json(
        { error: "Missing 'id', 'name', or 'post'." },
        { status: 400 }
      );
    }

    const index = tableData.findIndex((row) => row.id === parseInt(id, 10));
    if (index === -1) {
      return NextResponse.json({ error: `No row found with id ${id}` }, { status: 404 });
    }

    tableData[index].name = name;
    tableData[index].post = post;
    return NextResponse.json({ success: true, data: tableData }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// DELETE - remove a row
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing 'id'." }, { status: 400 });
    }
    const index = tableData.findIndex((row) => row.id === parseInt(id, 10));
    if (index === -1) {
      return NextResponse.json({ error: `No row found with id ${id}` }, { status: 404 });
    }
    tableData.splice(index, 1);
    return NextResponse.json({ success: true, data: tableData }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
