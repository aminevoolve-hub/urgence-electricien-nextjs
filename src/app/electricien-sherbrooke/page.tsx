import type { Metadata } from "next";
import { getLocalPageBySlug } from "@/lib/local-pages";
import LocalServicePage from "@/components/local-service-page";

const page = getLocalPageBySlug("electricien-sherbrooke")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/electricien-sherbrooke" },
};

export default function Page() {
  return <LocalServicePage page={page} />;
}
