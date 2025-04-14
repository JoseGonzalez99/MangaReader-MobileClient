// app/(app)/(manga)/volume/[volumeId].tsx
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Chapter } from '@/dtos/mangareader.dto';
import { useEffect } from 'react';
import { useAppStore } from '@/store/Slices';


export default function VolumenScreen() {
  const router = useRouter();
  const { volumeId } = useLocalSearchParams<{ volumeId: string }>();

  /*Lista de estados globales */
  const selectedVolume = useAppStore((s) => s.selectedVolume);
  const selectedManga = useAppStore((s) => s.selectedManga);

  const fetchChaptersByVolumeId = useAppStore((s) => s.fetchChaptersByVolumeId);
  const setSelectedChapter = useAppStore((s) => s.setSelectedChapter);
  const chapters = useAppStore((s) => s.chapters);

  // Obtener mangas al renderizar
  useEffect(() => {
    const getVolumes = async () => {
      await fetchChaptersByVolumeId(volumeId);
    };
    getVolumes();

  }, []);

  const handleChapterTouch = (entry: Chapter) => {
    setSelectedChapter(entry);
    router.push(`/(app)/reader/${entry.id}`);
  };

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: selectedVolume?.coverUrl }} // Aquí va la portada del volumen
        className="w-full h-60"
        resizeMode="cover"
      />
      <Text className="text-white text-center text-3xl font-bold mt-2">
        Volumen {selectedVolume?.volumeNumber}
      </Text>

      <Text className="text-white text-2xl font-bold mt-4 ml-4">Chapters</Text>

      <FlatList
        data={chapters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleChapterTouch(item)}
            className="bg-zinc-900 border border-primary rounded-xl mx-4 my-3 p-3 flex-row items-center"
          >
            <Image
              source={{ uri: selectedManga?.faviconUrl }}
              className="w-16 h-16 rounded-md mr-4"
            />

            <View>
              <Text className="text-primary font-bold">{item.title}</Text>

            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
