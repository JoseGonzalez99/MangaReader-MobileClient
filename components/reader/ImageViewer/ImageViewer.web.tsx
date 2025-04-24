// components/reader/ImageViewer/ImageViewer.web.tsx
import { View, ScrollView, Image } from "react-native";
import { ReaderControls } from "../ReaderControls";
import { ReaderTabs } from "../ReaderTabs";
import type { ImageViewerProps } from "./types";

export default function WebImageViewer({
  pagesSorted,
  showReaderTabs,
  onCloseReader,
  onToggleTabs,
  onNextChapter,
  onToggleChaptersDrawer,
  onToggleParamsDrawer,
}: ImageViewerProps) {
  return (
    <View className="flex-1 relative">
      {showReaderTabs && (
        <View className="absolute top-10 left-5 right-5 z-50">
          <ReaderControls
            onClose={onCloseReader}
            showReaderTabs={showReaderTabs}
            toggleTabs={onToggleTabs}
          />
        </View>
      )}

      <ScrollView className="flex-1 bg-black" contentContainerStyle={{ alignItems: "center" }}>
        {pagesSorted.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.uri }}
            style={{ width: "100%", maxWidth: 1000, resizeMode: "contain", marginBottom: 10 }}
          />
        ))}
      </ScrollView>

      {showReaderTabs && (
        <View className="absolute bottom-6 left-0 right-0 z-50">
          <ReaderTabs
            onChaptersTab={onToggleChaptersDrawer}
            onReaderConfigTab={onToggleParamsDrawer}
            onNextChapter={onNextChapter}
          />
        </View>
      )}
    </View>
  );
}
