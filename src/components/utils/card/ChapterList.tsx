import ChapterPill from "./ChapterPill";
import type { ChapterItem } from "./types";

interface ChapterListProps {
  seriesId: string | number;
  chapters: ChapterItem[];
}

export default function ChapterList({ seriesId, chapters }: ChapterListProps) {
  return (
    <div className="flex flex-col gap-2">
      {chapters.slice(0, 2).map((c) => (
        <ChapterPill key={c.id} href={`/chapter/${c.id}`} label={`Chapter ${c.number}`} meta={c.timeAgo} />
      ))}
    </div>
  );
}
