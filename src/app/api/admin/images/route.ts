import { NextRequest, NextResponse } from "next/server";
import {
  deleteSlotBlobs,
  isBlobConfigured,
  loadImageOverrides,
  revalidateImages,
  slotKey,
  slotPrefix,
} from "@/lib/image-overrides";
import { getImageSlotGroups, resolveSlot } from "@/lib/image-slots";
import { getOriginalImage } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function GET() {
  const overrides = await loadImageOverrides();
  const groups = (await getImageSlotGroups()).map((group) => ({
    id: group.id,
    label: group.label,
    slots: group.slots.map((slot) => {
      const original = getOriginalImage(slot.section, slot.name);
      const override = overrides[slotKey(slot.section, slot.name)] ?? null;
      return { ...slot, original, override, current: override ?? original };
    }),
  }));
  return NextResponse.json({ configured: isBlobConfigured(), groups });
}

// Called once the browser has finished uploading: keep only the new blob and publish it.
export async function POST(request: NextRequest) {
  const { section, name, url } = await request.json();
  if (!(await resolveSlot(section, name)) || typeof url !== "string") {
    return NextResponse.json({ error: "Emplacement d'image inconnu" }, { status: 400 });
  }
  if (!new URL(url).pathname.startsWith(`/${slotPrefix(section, name)}`)) {
    return NextResponse.json({ error: "URL d'image invalide" }, { status: 400 });
  }

  await deleteSlotBlobs(section, name, url);
  revalidateImages();
  return NextResponse.json({ success: true, url });
}

export async function DELETE(request: NextRequest) {
  const { section, name } = await request.json();
  if (!(await resolveSlot(section, name))) {
    return NextResponse.json({ error: "Emplacement d'image inconnu" }, { status: 400 });
  }

  await deleteSlotBlobs(section, name);
  revalidateImages();
  return NextResponse.json({ success: true, original: getOriginalImage(section, name) });
}
