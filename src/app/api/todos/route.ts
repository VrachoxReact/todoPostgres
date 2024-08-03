import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    console.log("Database connected successfully");
    const result = await client.query("SELECT * FROM todos ORDER BY id ASC");
    console.log("Query result:", result.rows);
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    console.error("Database error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Internal Server Error",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  } finally {
    if (client) client.release();
  }
}

export async function POST(request: Request) {
  let client;
  try {
    const { text } = await request.json();
    client = await pool.connect();
    const result = await client.query(
      "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *",
      [text, false]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error adding todo:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to add todo", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to add todo", details: "An unknown error occurred" },
        { status: 500 }
      );
    }
  } finally {
    if (client) client.release();
  }
}

export async function PUT(request: Request) {
  let client;
  try {
    const { id, text, completed } = await request.json();
    client = await pool.connect();
    const result = await client.query(
      "UPDATE todos SET text = $1, completed = $2 WHERE id = $3 RETURNING *",
      [text, completed, id]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error updating todo:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to update todo", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to update todo",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  } finally {
    if (client) client.release();
  }
}

export async function DELETE(request: Request) {
  let client;
  try {
    const { id } = await request.json();
    client = await pool.connect();
    await client.query("DELETE FROM todos WHERE id = $1", [id]);
    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting todo:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete todo", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to delete todo",
          details: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  } finally {
    if (client) client.release();
  }
}
