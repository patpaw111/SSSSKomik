export interface ChapterItem {
  id: string | number;
  number: string | number;
  timeAgo: string;
}

export interface SeriesCardBaseProps {
  seriesId: string | number;
  title: string;
  imageUrl: string;
  statusLabel?: string;
}
