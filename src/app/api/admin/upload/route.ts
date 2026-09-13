import { put } from "@vercel/blob";
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

    // Upload to Vercel Blob Storage
    const filename = `${Date.now()}-${file.name}`;
    const pathname = `${category}/${filename}`;

    const blob = await put(pathname, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      filename: file.name,
      url: blob.url,
      message: "✅ Fichier uploadé avec succès!",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur lors de l'upload"
      },
      { status: 500 }
    );
  }
}
