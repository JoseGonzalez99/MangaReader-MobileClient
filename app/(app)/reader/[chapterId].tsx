import { useAppStore } from "@/store/Slices";
import { getNextChapter } from "@/utils/readerUtils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ChapterSourceSelector } from "@/components/reader/ChapterSourceSelector";
import ReaderDrawers from "@/components/reader/ReaderDrawers";
import ImageViewer from "@/components/reader/ImageViewer/index";
export default function ReaderScreen() {
  const selectedChapter = useAppStore((s) => s.selectedChapter);
  const selectedManga = useAppStore((s) => s.selectedManga);
  const selectedChapterSource = useAppStore((s) => s.selectedChapterSource);
  const userPreferences = useAppStore((s) => s.userPreferences);
  const chapters = useAppStore((s) => s.chapters);
  const pages = useAppStore((s) => s.pages);

  const setSelectedChapter = useAppStore((s) => s.setSelectedChapter);
  const clearContent = useAppStore((s) => s.clearContent);
  const fetchAllChaptersOfManga = useAppStore((s) => s.fetchAllChaptersOfManga);
  const fetchPages = useAppStore((s) => s.fetchPages);

  const [pagesSorted, setPagesSorted] = useState<{ uri: string }[]>([]);
  const [showReaderTabs, setShowReaderTabs] = useState(true);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState(false);
  const [showParamsDrawer, setShowParamsDrawer] = useState(false);

  useEffect(() => {
    if (selectedManga) fetchAllChaptersOfManga(selectedManga.id);
  }, [selectedManga]);

  useEffect(() => {
    if (pages.length > 0) {
      const images = (
        (userPreferences?.readingDirection as "ltr" | "rtl") === "rtl"
          ? [...pages].reverse()
          : pages
      ).map((p) => ({ uri: p.imageUrl }));
      setPagesSorted(images);
    }
  }, [pages, userPreferences]);

  useEffect(() => {
    if (selectedChapter?.id && selectedChapterSource?.languageCode) {
      fetchPages(selectedChapter.id, selectedChapterSource.languageCode);
    }
  }, [selectedChapter, selectedChapterSource]);

  const toggleReaderParamDrawer = () => setShowParamsDrawer(!showParamsDrawer);
  const toggleReaderChapterListDrawer = () => setShowChaptersDrawer(!showChaptersDrawer);

  const onNextChapter = () => {
    const next = getNextChapter(chapters, selectedChapter);
    next ? setSelectedChapter(next) : router.push(`/(app)/(main)/manga/${selectedManga?.id}`);
  };

  const onCloseReader = () => {
    clearContent();
    router.push(`/(app)/(main)/home`);
  };

  return (
    <View className="flex-1 bg-background p-4">
      {!selectedChapterSource ? (
        <ChapterSourceSelector />
      ) : (
        <View className="flex-1">
          <ImageViewer
            pagesSorted={pagesSorted}
            showReaderTabs={showReaderTabs}
            userPreferences={userPreferences}
            onCloseReader={onCloseReader}
            onToggleTabs={() => setShowReaderTabs((p) => !p)}
            onNextChapter={onNextChapter}
            onToggleChaptersDrawer={toggleReaderChapterListDrawer}
            onToggleParamsDrawer={toggleReaderParamDrawer}
          />
          <ReaderDrawers
            showParamsDrawer={showParamsDrawer}
            showChaptersDrawer={showChaptersDrawer}
            toggleParamsDrawer={toggleReaderParamDrawer}
            toggleChaptersDrawer={toggleReaderChapterListDrawer}
          />
        </View>
      )}
    </View>
  );
}
