// components/reader/ImageViewer/index.tsx
import { Platform } from "react-native";
import type { ComponentType } from "react";

import type { ImageViewerProps } from "./types";

let ImageViewer: ComponentType<ImageViewerProps>;

if (Platform.OS === "web") {
  ImageViewer = require("./ImageViewer.web").default;
} else {
  ImageViewer = require("./ImageViewer.native").default;
}

export default ImageViewer;
