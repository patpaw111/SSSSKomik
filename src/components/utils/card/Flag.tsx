import Image from "next/image";

interface FlagProps {
  src?: string;
  alt?: string;
  className?: string;
}

export default function Flag({
  src = "/flag/Flag_of_South_Korea.svg",
  alt = "Country flag",
  className,
}: FlagProps) {
  return (
    <Image src={src} alt={alt} width={32} height={24} className={className ?? "w-5 h-3.5 md:w-8 md:h-6"} />
  );
}
