import React, { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useAppStore } from "@/store/Slices";
import { FontAwesome } from "@expo/vector-icons";

const ReaderParams = () => {
  const updateUserPreferences = useAppStore((s) => s.updateUserPreferences);
  const selectedReaderOrientation = useAppStore(
    (s) => s.userPreferences?.readingDirection
  );
  const [activeDirection, setActiveDirection] = useState<"ltr" | "rtl" | null>(
    selectedReaderOrientation ?? null
  );

  // Sync local state when Zustand state cambia externamente
  useEffect(() => {
    if (selectedReaderOrientation) {
      setActiveDirection(selectedReaderOrientation);
    }
  }, [selectedReaderOrientation]);

  const handleDirectionChange = async (direction: "ltr" | "rtl") => {
    if (direction !== activeDirection) {
      await updateUserPreferences(direction);
      setActiveDirection(direction);
    }
  };

  return (
	<View className="flex-1 items-center bg-secondary px-4 py-6">
	<View className="w-full mb-4">
	  <Text className="text-white text-base mb-2">
		Dirección de lectura
	  </Text>

	  <View className="flex-row justify-center gap-4">
		<TouchableOpacity
		  onPress={() => handleDirectionChange("ltr")}
		  className={`flex-row items-center px-4 py-2 rounded-lg ${
			activeDirection === "ltr"
			  ? "bg-primary"
			  : "bg-neutral-700 opacity-70"
		  }`}
		>
		  <FontAwesome
			name="arrow-right"
			size={16}
			color="#fff"
			className="mr-2"
		  />
		  <Text className="text-white font-semibold">Normal</Text>
		</TouchableOpacity>

		<TouchableOpacity
		  onPress={() => handleDirectionChange("rtl")}
		  className={`flex-row items-center px-4 py-2 rounded-lg ${
			activeDirection === "rtl"
			  ? "bg-primary"
			  : "bg-neutral-700 opacity-70"
		  }`}
		>
		  <FontAwesome
			name="arrow-left"
			size={16}
			color="#fff"
			className="mr-2"
		  />
		  <Text className="text-white font-semibold">Japonés</Text>
		</TouchableOpacity>
	  </View>
	</View>
  </View>
  );
};

export default ReaderParams;
