import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "../upload/route";

export async function GET() {
  return NextResponse.json(siteConfig);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Update config with new values
    if (body.logo) siteConfig.logo = body.logo;
    if (body.favicon) siteConfig.favicon = body.favicon;

    siteConfig.lastUpdated = new Date().toISOString();

    return NextResponse.json({
      success: true,
      config: siteConfig,
      message: "Configuration mise à jour",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
