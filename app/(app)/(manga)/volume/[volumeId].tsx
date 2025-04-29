// app/(app)/(manga)/volume/[volumeId].tsx
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Chapter } from "@/dtos/mangareader.dto";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/Slices";

export default function VolumenScreen() {
  const router = useRouter();
  const { volumeId } = useLocalSearchParams<{ volumeId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  /*Lista de estados globales */
  const selectedVolume = useAppStore((s) => s.selectedVolume);
  const selectedManga = useAppStore((s) => s.selectedManga);

  const fetchChaptersByVolumeId = useAppStore((s) => s.fetchChaptersByVolumeId);
  const setSelectedChapter = useAppStore((s) => s.setSelectedChapter);
  const chapters = useAppStore((s) => s.chapters);

  // Obtener mangas al renderizar
  useEffect(() => {
    const getVolumes = async () => {
      setLoading(true);
      try {
        await fetchChaptersByVolumeId(volumeId);
      } catch (e) {
        alert("Problemas al obtener capitulos");
      } finally {
        setLoading(false);
      }
    };
    getVolumes();
  }, []);

  const handleChapterTouch = (entry: Chapter) => {
    setSelectedChapter(entry);
    router.push(`/(app)/reader/${entry.id}`);
  };

  return (
    <View className="flex-1 bg-background">
      <Image
        source={{ uri: selectedVolume?.coverUrl }} // Aquí va la portada del volumen
        className="w-full h-3/6"
        resizeMode="stretch"
      />
      <Text className="text-white text-center text-3xl font-bold mt-4">
        Volumen {selectedVolume?.volumeNumber}
      </Text>

      <Text className="text-white text-2xl font-bold mt-4 ml-4">Capitulos</Text>

      {loading ? (
        <View className="flex-1 justify-center items-center mt-20">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-4">Cargando capitulos...</Text>
        </View>
      ) : (
        <FlatList
          data={chapters}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChapterTouch(item)}
              className=" mx-4 my-1 flex-row items-center"
            >
              <Image
                source={{ uri: selectedManga?.coverUrl }}
                className="w-16 h-16 rounded-md mr-4"
              />

              <View>
                <Text className="text-primary font-bold">{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
