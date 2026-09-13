import type { Metadata } from "next";
import { getLocalPageBySlug } from "@/lib/local-pages";
import LocalServicePage from "@/components/local-service-page";

const page = getLocalPageBySlug("urgence-electricien")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/urgence-electricien" },
};

export default function Page() {
  return <LocalServicePage page={page} />;
}
