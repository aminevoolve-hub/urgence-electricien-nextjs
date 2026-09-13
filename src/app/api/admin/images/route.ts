import { NextRequest, NextResponse } from "next/server";

// Store image metadata
export let imageConfig = {
  images: [] as any[],
  lastUpdated: new Date().toISOString(),
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const page = formData.get("page") as string;
    const section = formData.get("section") as string;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier sélectionné" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const fileUrl = `/images/uploads/${page}/${filename}`;

    // Store image metadata
    imageConfig.images.push({
      filename,
      page,
      section,
      originalName: file.name,
      type: file.type,
      size: file.size,
      url: fileUrl,
      uploaded: new Date().toISOString(),
    });

    imageConfig.lastUpdated = new Date().toISOString();

    return NextResponse.json({
      success: true,
      filename,
      page,
      section,
      url: fileUrl,
      message: `✅ ${file.name} uploadé pour ${page}/${section}`,
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
    images: imageConfig.images,
    message: "Images par page",
  });
}
