import { NextRequest, NextResponse } from "next/server";

export let colorConfig = {
  primary: "#1E40AF",
  accent: "#EA580C",
  secondary: "#0A5C8A",
};

export async function GET() {
  return NextResponse.json(colorConfig);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.primary) colorConfig.primary = body.primary;
    if (body.accent) colorConfig.accent = body.accent;
    if (body.secondary) colorConfig.secondary = body.secondary;

    return NextResponse.json({
      success: true,
      colors: colorConfig,
      message: "Couleurs mises à jour",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
