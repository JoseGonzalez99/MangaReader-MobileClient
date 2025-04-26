import { Chapter, ChapterSource } from "@/dtos/mangareader.dto";
import { useAppStore } from "@/store/Slices";
import { useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

export const ChapterSourceSelector = () => {
  const setSelectedChapterSource = useAppStore(
    (s) => s.setSelectedChapterSource
  );

  const selectedChapter = useAppStore((s) => s.selectedChapter);

  const fetchChaptersSources = useAppStore((s) => s.fetchChaptersSources);

  const sources = useAppStore((s) => s.sources);

  //Este useEffect solo se ejecuta la primera vers que se carga la pantalla.
  useEffect(() => {
    const initializeAvailableSources = async () => {
      //Inicializamos la lista de sources disponibles
      if (sources.length == 0) {
        await fetchChaptersSources((selectedChapter as Chapter).id);
      }
    };

    initializeAvailableSources();
  }, []);

  const onSelectSource = async (source: ChapterSource) => {
    setSelectedChapterSource(source);
  };

  return (
    <View>
      <Text className="text-white text-2xl font-bold mt-16 ml-4">
        Seleccione una fuente{" "}
      </Text>

      {/*Aca se agrega un componente a modod de modal en donde pida seleccionar primero un source, se debe listas la lista source */}
      <FlatList
        data={sources}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => onSelectSource(item)}
          activeOpacity={0.8}
          className="bg-neutral-950 border border-primary rounded-2xl mx-5 my-3 px-4 py-5 flex-row items-center shadow-sm"
        >
          <Image
            source={{ uri: item.logoUrl }}
            className="w-28 h-16 rounded-lg mr-5"
            resizeMode="contain"
          />
    
          <View className="flex-1">
            <Text className="text-primary text-lg font-extrabold mb-1">
              {item.providerName}
            </Text>
            <Text className="text-gray-400 text-xs uppercase tracking-widest">
              {item.languageCode}
            </Text>
          </View>
        </TouchableOpacity>
        )}
      />
    </View>
  );
};
