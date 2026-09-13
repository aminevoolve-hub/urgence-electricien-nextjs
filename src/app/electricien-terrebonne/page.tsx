import type { Metadata } from "next";
import { getLocalPageBySlug } from "@/lib/local-pages";
import LocalServicePage from "@/components/local-service-page";

const page = getLocalPageBySlug("electricien-terrebonne")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/electricien-terrebonne" },
};

export default function Page() {
  return <LocalServicePage page={page} />;
}
