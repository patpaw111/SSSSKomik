import type { SeriesCardBaseProps } from "./types";
import Cover from "./Cover";
import Title from "./Title";
import ChapterList from "./ChapterList";
import type { ChapterItem } from "./types";

interface SeriesCardProps extends SeriesCardBaseProps {
  chapters: ChapterItem[];
  flagSrc?: string;
}

export default function SeriesCard({ seriesId, title, imageUrl, chapters, statusLabel = "UP", flagSrc }: SeriesCardProps) {
  const href = `/series/${seriesId}`;

  return (
    <article className="flex flex-col gap-4 md:gap-6">
      <Cover href={href} imageUrl={imageUrl} flagSrc={flagSrc} />
      <Title href={href} title={title} statusLabel={statusLabel} />
      <ChapterList seriesId={seriesId} chapters={chapters} />
    </article>
  );
}
