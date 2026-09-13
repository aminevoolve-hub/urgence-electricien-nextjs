import { NextRequest, NextResponse } from "next/server";

// Simple in-memory storage for uploaded files
const uploadedFiles: Record<string, { name: string; type: string; size: number; uploaded: string }> = {};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier sélectionné" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;
    const storageKey = `${category}/${filename}`;

    // Store file info
    uploadedFiles[storageKey] = {
      name: file.name,
      type: file.type,
      size: file.size,
      uploaded: new Date().toISOString(),
    };

    // Create download URL (for now, just return filename)
    return NextResponse.json({
      success: true,
      filename: file.name,
      storageKey: storageKey,
      size: file.size,
      type: file.type,
      message: `✅ ${file.name} uploadé avec succès!`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur lors de l'upload",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    files: uploadedFiles,
    message: "Fichiers uploadés",
  });
}
