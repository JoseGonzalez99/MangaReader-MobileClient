import { FontAwesome } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";

export const ReaderTabs = ({
  onChaptersTab,
  onReaderConfigTab,
  onNextChapter,
}: {
  onChaptersTab: () => void;
  onReaderConfigTab: () => void;
  onNextChapter: () => void;
}) => {
  return (
    <>
      <View className="absolute bottom-4 left-5 right-5 flex-row justify-around items-center bg-[#b30000] h-[50px] rounded-2xl">
        <TouchableOpacity onPress={onChaptersTab}>
          <FontAwesome name="bars" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onReaderConfigTab}>
          <FontAwesome name="cog" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextChapter}>
          <FontAwesome name="arrow-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};
