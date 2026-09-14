import Link from "next/link";
import type { ReactNode } from "react";

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

function inline(text: string, key: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    if (match[1]) {
      const href = match[2];
      parts.push(
        href.startsWith("/") ? (
          <Link key={`${key}-${i}`} href={href} className="font-semibold text-amber-700 underline-offset-2 hover:text-amber-600 hover:underline">
            {match[1]}
          </Link>
        ) : (
          <a key={`${key}-${i}`} href={href} className="font-semibold text-amber-700 underline-offset-2 hover:underline" rel="noopener">
            {match[1]}
          </a>
        )
      );
    } else {
      parts.push(
        <strong key={`${key}-${i}`} className="font-semibold text-navy-900">
          {match[3]}
        </strong>
      );
    }
    last = index + match[0].length;
    i++;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function BlogContent({ blocks }: { blocks: string[] }) {
  const nodes: ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="list-disc space-y-2 pl-6">
        {list.map((item, j) => (
          <li key={j}>{inline(item, `li-${nodes.length}-${j}`)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  blocks.forEach((block, i) => {
    if (block.startsWith("- ")) {
      list.push(block.slice(2));
      return;
    }
    flushList();
    if (block.startsWith("## ")) {
      nodes.push(
        <h2 key={i} className="pt-4 font-heading text-2xl text-navy-900">
          {inline(block.slice(3), `h2-${i}`)}
        </h2>
      );
    } else if (block.startsWith("### ")) {
      nodes.push(
        <h3 key={i} className="pt-2 font-heading text-xl text-navy-900">
          {inline(block.slice(4), `h3-${i}`)}
        </h3>
      );
    } else {
      nodes.push(<p key={i}>{inline(block, `p-${i}`)}</p>);
    }
  });
  flushList();

  return <div className="mt-8 space-y-5 text-navy-700">{nodes}</div>;
}
