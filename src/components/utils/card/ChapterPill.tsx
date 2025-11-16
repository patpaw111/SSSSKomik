import Link from "next/link";

interface ChapterPillProps {
  href: string;
  label: string;
  meta: string;
}

export default function ChapterPill({ href, label, meta }: ChapterPillProps) {
  return (
    <Link
      href={href}
      className="flex justify-between items-center py-[4px] md:py-[6px] px-[8px] md:px-[10px] bg-base-card rounded-[8px] text-base-white"
    >
      <span className="text-[11px] md:text-[12px]">{label}</span>
      <span className="text-[9px] md:text-[10px] opacity-80">{meta}</span>
    </Link>
  );
}
