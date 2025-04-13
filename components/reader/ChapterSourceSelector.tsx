import { Chapter, ChapterSource } from "@/dtos/mangareader.dto";
import { useAppStore } from "@/store/Slices";
import { useEffect } from "react";
import { View,Text,Image, FlatList, TouchableOpacity } from "react-native"


export const ChapterSourceSelector = ()=>{
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
        <Text className="text-white text-2xl font-bold mt-4 ml-4">
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
              className="bg-zinc-900 border border-primary rounded-xl mx-4 my-3 p-3 flex-row items-center"
            >
              <Image
                source={{ uri: item.logoUrl }}
                className="w-32 h-16 rounded-md mr-4 "
              />

              <View>
                <Text className="text-primary font-bold">
                  {item.providerName}- {item.languageCode}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
 
}