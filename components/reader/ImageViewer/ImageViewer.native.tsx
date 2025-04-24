// components/reader/ImageViewer/ImageViewer.native.tsx
import { View } from "react-native";
import ImageViewing from "react-native-image-viewing";
import { ReaderControls } from "../ReaderControls";
import { ReaderTabs } from "../ReaderTabs";
import { ImageViewerProps } from "./types";

export default function MobileImageViewer({
  pagesSorted,
  showReaderTabs,
  userPreferences,
  onCloseReader,
  onToggleTabs,
  onNextChapter,
  onToggleChaptersDrawer,
  onToggleParamsDrawer,
}: ImageViewerProps) {
  return (
    <ImageViewing
      images={pagesSorted}
      imageIndex={
        userPreferences?.readingDirection === "rtl" && pagesSorted.length > 0
          ? pagesSorted.length - 1
          : 0
      }
      visible={true}
      swipeToCloseEnabled={false}
      doubleTapToZoomEnabled={true}
      onRequestClose={() => {}}
      HeaderComponent={() => (
        <ReaderControls
          onClose={onCloseReader}
          showReaderTabs={showReaderTabs}
          toggleTabs={onToggleTabs}
        />
      )}
      FooterComponent={() =>
        showReaderTabs && (
          <View className="absolute bottom-6 left-0 right-0 z-50">
            <ReaderTabs
              onChaptersTab={onToggleChaptersDrawer}
              onReaderConfigTab={onToggleParamsDrawer}
              onNextChapter={onNextChapter}
            />
          </View>
        )
      }
    />
  );
}
