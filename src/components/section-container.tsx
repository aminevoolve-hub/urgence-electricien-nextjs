export default function SectionContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-6xl px-4 lg:px-8 ${className}`}>{children}</div>;
}
