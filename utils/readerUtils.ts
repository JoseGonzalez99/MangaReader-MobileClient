import { Chapter } from "@/dtos/mangareader.dto";

export function getNextChapter(
  chapters: Chapter[],
  current: Chapter | null
): Chapter | null {
  if (!current) return null;

  const index = chapters.findIndex((c) => c.id === current.id);
  if (index === -1 || index === chapters.length - 1) return null;

  return chapters[index + 1];
}

export function getPreviousChapter(
  chapters: Chapter[],
  current: Chapter | null
): Chapter | null {
  if (!current) return null;

  const index = chapters.findIndex((c) => c.id === current.id);
  if (index <= 0) return null;

  return chapters[index - 1];
}
