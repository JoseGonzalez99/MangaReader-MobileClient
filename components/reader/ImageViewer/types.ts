// components/reader/ImageViewer/types.ts
export interface ImageViewerProps {
    pagesSorted: { uri: string }[];
    showReaderTabs: boolean;
    userPreferences: any;
    onCloseReader: () => void;
    onToggleTabs: () => void;
    onNextChapter: () => void;
    onToggleChaptersDrawer: () => void;
    onToggleParamsDrawer: () => void;
  }
  