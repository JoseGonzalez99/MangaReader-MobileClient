// components/reader/ReaderControls.tsx
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

export function ReaderControls({ onClose, showReaderTabs, toggleTabs }: {
  onClose: () => void;
  showReaderTabs: boolean;
  toggleTabs: () => void;
}) {
  return (
    <View className="absolute top-10 left-5 right-5 z-50 flex-row justify-around">
      {showReaderTabs && (
        <TouchableOpacity
          onPress={onClose}
          className="bg-red-700 px-4 py-2 rounded-full flex-row items-center gap-x-2"
        >
          <FontAwesome name="times" size={18} color="#fff" />
          <Text className="text-white text-xs opacity-90">Cerrar lector</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={toggleTabs}
        className="bg-black/70 px-4 py-2 rounded-full flex-row items-center gap-x-2"
      >
        {showReaderTabs ? (
          <>
            <Text className="text-white text-xs opacity-90">Ocultar interfaz</Text>
            <FontAwesome name="eye-slash" size={18} color="#fff" />
          </>
        ) : (
          <>
            <Text className="text-white text-xs opacity-90">Mostrar interfaz</Text>
            <FontAwesome name="eye" size={18} color="#fff" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
