import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { BLOB_PREFIX } from "@/lib/image-overrides";
import { findSlot } from "@/lib/image-slots";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_SIZE = 15 * 1024 * 1024;

// Issues a short-lived token so the browser uploads straight to Blob (bypasses the 4.5 MB body limit).
export async function POST(request: NextRequest) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const [prefix, section, name] = pathname.split("/");
        if (`${prefix}/` !== BLOB_PREFIX || !findSlot(section, name)) {
          throw new Error("Emplacement d'image inconnu");
        }
        return { allowedContentTypes: ALLOWED_TYPES, maximumSizeInBytes: MAX_SIZE, addRandomSuffix: false };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload refusé" },
      { status: 400 }
    );
  }
}
