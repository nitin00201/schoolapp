import pool from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import fallbackSchools from "@/lib/fallbackData"; // create this file

// ===== POST (Add School) =====
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    let imageName = "";

    // handle image upload
    if (imageFile && imageFile.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/schoolImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const timestamp = Date.now();
      const extension = path.extname(imageFile.name);
      imageName = `school_${timestamp}${extension}`;

      const filePath = path.join(uploadDir, imageName);
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);
    }

    try {
      // try DB insert
      const query = `
        INSERT INTO schools (name, address, city, state, contact, email_id, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await pool.query(query, [
        name,
        address,
        city,
        state,
        contact,
        email_id,
        imageName,
      ]);

      return NextResponse.json(
        { message: "School added successfully", imageName },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn("⚠️ DB unavailable → storing only in fallback:", dbError.message);

      // push into fallback in-memory array
      fallbackSchools.push({
        id: fallbackSchools.length + 1,
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image: imageName || "placeholder.jpg",
      });

      return NextResponse.json(
        { message: "School stored in fallback (DB unavailable)", imageName },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { error: "Failed to add school: " + error.message },
      { status: 500 }
    );
  }
}

// ===== GET (Fetch Schools) =====
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools ORDER BY id DESC");

    if (!rows || rows.length === 0) {
      console.warn("⚠️ DB empty → using fallback data");
      return NextResponse.json(fallbackSchools, { status: 200 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.warn("⚠️ DB connection failed → using fallback:", error.message);
    return NextResponse.json(fallbackSchools, { status: 200 });
  }
}
