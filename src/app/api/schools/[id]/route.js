import pool from "@/lib/db";
import { NextResponse } from "next/server";
import fallbackSchools from "@/lib/fallbackData";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Try DB first
    const [rows] = await pool.query("SELECT * FROM schools WHERE id = ?", [id]);

    if (rows.length === 0) {
      console.warn(`⚠️ School ${id} not found in DB → checking fallback`);
      const fallback = fallbackSchools.find((s) => String(s.id) === String(id));
      if (!fallback) {
        return NextResponse.json({ error: "School not found" }, { status: 404 });
      }
      return NextResponse.json(fallback, { status: 200 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.warn("⚠️ DB connection failed → using fallback:", error.message);

    // Fallback mode
    const { id } = params;
    const fallback = fallbackSchools.find((s) => String(s.id) === String(id));
    if (!fallback) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }
    return NextResponse.json(fallback, { status: 200 });
  }
}
