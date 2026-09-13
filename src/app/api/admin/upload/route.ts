import { NextRequest, NextResponse } from "next/server";

// Simple in-memory storage for uploaded files
const uploadedFiles: Record<string, { name: string; type: string; size: number; uploaded: string }> = {};

// Store current configuration in memory (shared with /api/admin/config)
export let siteConfig = {
  logo: "/images/logo-urgence-electricien.svg",
  favicon: "/favicon.ico",
  lastUpdated: new Date().toISOString(),
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const fileType = formData.get("fileType") as string; // "logo" or "favicon"

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

    // Create a data URL for the uploaded file
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const fileUrl = `data:${file.type};base64,${base64}`;

    // Update site config if this is logo or favicon
    if (fileType === "logo") {
      siteConfig.logo = fileUrl;
      siteConfig.lastUpdated = new Date().toISOString();
    } else if (fileType === "favicon") {
      siteConfig.favicon = fileUrl;
      siteConfig.lastUpdated = new Date().toISOString();
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      storageKey: storageKey,
      size: file.size,
      type: file.type,
      fileUrl: fileUrl,
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
