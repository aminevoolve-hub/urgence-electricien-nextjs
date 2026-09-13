import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const FOLDER_ID = "1kUD3gPv3RGARed7nhHF3ERL_0YACTFC7"; // Your shared folder ID

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 401 }
    );
  }

  try {
    // List files from the folder
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,webViewLink,webContentLink)&pageSize=1000`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch files from Google Drive" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Filter only image files
    const imageFiles = data.files.filter((file: any) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.mimeType)
    );

    return NextResponse.json({
      success: true,
      files: imageFiles.map((file: any) => ({
        id: file.id,
        name: file.name,
        type: file.mimeType,
        url: `https://drive.google.com/uc?export=download&id=${file.id}`,
        viewLink: file.webViewLink,
      })),
    });
  } catch (error) {
    console.error("Drive API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
