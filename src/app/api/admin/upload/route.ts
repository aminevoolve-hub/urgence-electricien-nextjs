import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", category || "");
    mkdirSync(uploadsDir, { recursive: true });

    // Read file as buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save file
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(uploadsDir, filename);
    writeFileSync(filepath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${category}/${filename}`;

    return NextResponse.json({
      success: true,
      filename,
      url: publicUrl,
      message: "Fichier uploadé avec succès",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload" },
      { status: 500 }
    );
  }
}
