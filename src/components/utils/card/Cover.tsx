import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import Flag from "./Flag";

interface CoverProps {
  href: string;
  imageUrl: string;
  children?: ReactNode;
  showFlag?: boolean;
  flagSrc?: string;
}

export default function Cover({ href, imageUrl, children, showFlag = true, flagSrc }: CoverProps) {
  return (
    <Link href={href} className="relative z-10 flex flex-col text-center aspect-[112/170] overflow-hidden rounded-lg group">
      {/* Background Image dengan Next/Image untuk optimasi */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Komik cover"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover"
          priority={false}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.75) 100%)",
          }}
        />
      </div>
      {children}
      {showFlag && (
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 pointer-events-none z-10">
          <Flag src={flagSrc} className="w-5 h-3.5 md:w-8 md:h-6 drop-shadow" />
        </div>
      )}
    </Link>
  );
}
