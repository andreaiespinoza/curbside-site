// app/api/table-data/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";



// GET
export async function GET() {
  const supabase = await createClient();
  const { data: Assignments, error } = await supabase.from("Assignments").select("*");
  if (error !== null){
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  return NextResponse.json({ data: Assignments }, { status: 200 });
}

// POST - add a new row
export async function POST(request: Request) {
  const supabase = await createClient();
  try {
    const { name, post } = await request.json();
    if (!name || !post) {
      return NextResponse.json({ error: "Missing 'name' or 'post'." }, { status: 400 });
    }
    const { data, error } = await supabase
    .from('Assignments')
    .insert(
      { name: name, post: post})
    .select("*")
    if (error !== null){
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    
    return NextResponse.json({ success: true, data: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// PUT - update a row
export async function PUT(request: Request) {
  const supabase = await createClient();
  try {
    const { id, name, post } = await request.json();
    if (!id || !name || !post) {
      return NextResponse.json(
        { error: "Missing 'id', 'name', or 'post'." },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
    .from('Assignments')
    .update({ name: name, post: post })
    .eq('id', id)
    .select()
        
    if (error !== null) {
      return NextResponse.json({ error: error }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// DELETE - remove a row
export async function DELETE(request: Request) {
  const supabase = await createClient();
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing 'id'." }, { status: 400 });
    }
    
    const { data, error } = await supabase
    .from('Assignments')
    .delete()
    .eq('id', id)
    .select("*")
    
    if (error !== null) {
      return NextResponse.json({ error: error }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data}, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
