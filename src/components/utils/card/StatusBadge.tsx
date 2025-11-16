interface StatusBadgeProps {
  label?: string;
  className?: string;
}

export default function StatusBadge({ label = "UP", className }: StatusBadgeProps) {
  return (
    <span className={`bg-danger-500 align-[2px] md:align-[3px] px-[8px] md:px-[10px] text-[8px] md:text-[9px] leading-[12px] md:leading-[14px] text-base-white rounded-[4px] font-normal mr-1 ${className ?? ""}`}>
      {label}
    </span>
  );
}
