import Link from "next/link";

interface TitleProps {
  href: string;
  title: string;
  statusLabel?: string;
}

import StatusBadge from "./StatusBadge";

export default function Title({ href, title, statusLabel = "UP" }: TitleProps) {
  return (
    <div className="h-[40px] md:h-[48px] flex items-center">
      <Link
        href={href}
        className="font-medium text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] line-clamp-2 text-base-white text-center flex-1"
        title={title}
      >
        <StatusBadge label={statusLabel} />
        {title}
      </Link>
    </div>
  );
}
