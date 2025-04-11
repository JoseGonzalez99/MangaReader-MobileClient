// app/(app)/(manga)/volume/[volumeId].tsx
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Chapter, Volume } from '@/dtos/mangareader.dto';
import { useEffect, useState } from 'react';
import { useContent } from '@/hooks/useContent';





export default function VolumenScreen() {
  const router = useRouter();
  const { volumeId } = useLocalSearchParams<{volumeId:string}>();

    const { fetchVolume,fetchChapterByVolume, contentError, contentLoading } = useContent();
  
    const [selectedVolume, setSelectedVolume] = useState<Volume|null>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);


    // Obtener mangas al renderizar
    useEffect(() => {
      const getVolumenInfo = async () => {
        try {
          const volume: Volume|null = await fetchVolume(volumeId);
          setSelectedVolume(volume);
          
        } catch (e) {
          console.error("Error fetching mangas:", e);
        }
      };
      const getVolumes = async () => {
        try {
          const chaps: Chapter[] = await fetchChapterByVolume(volumeId);
          setChapters(chaps);
          
        } catch (e) {
          console.error("Error fetching mangas:", e);
        }
      };
      getVolumenInfo();
     getVolumes();

    }, []);

  const handleChapterTouch = (entry: Chapter) => {
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
            onPress={()=>handleChapterTouch(item)}
            className="bg-zinc-900 border border-primary rounded-xl mx-4 my-3 p-3 flex-row items-center"
          >
              <Image
              source={{ uri: "https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg" }}
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
