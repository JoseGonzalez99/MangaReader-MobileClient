import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { ReadingEntry, Volume } from "@/dtos/mangareader.dto";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useScrollY } from "@/hooks/useScrollY";
import { useAppStore } from "@/store/Slices";
const MangaDetailScreen = () => {
  const { mangaId } = useLocalSearchParams<{ mangaId: string }>();
  const router = useRouter();
  const scrollY = useScrollY();
  const [isFavorite, setIsFavorite] = useState(false);
  /*Lista de estados globales */
  const selectedManga = useAppStore((s) => s.selectedManga);
  const setSelectedVolume = useAppStore((s) => s.setSelectedVolume);
  const fetchVolumesByMangaId = useAppStore((s) => s.fetchVolumesByMangaId);
  const fetchChapterById = useAppStore((s) => s.fetchChapterById);
  const isInProgress = useAppStore((s) => s.isInProgress);

  const [lecture, setLecture] = useState<ReadingEntry | null>(null);
  const volumesOfSelectedManga = useAppStore((s) => s.volumesOfSelectedManga);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Obtener mangas al renderizar
  useEffect(() => {
    const getVolumes = async () => {
      try {
        await fetchVolumesByMangaId(mangaId);
      } catch (e) {
        console.error("Error fetching mangas:", e);
      }
    };
    getVolumes();
  }, []);

  useEffect(() => {
    const checkIsReadInProgress = async () => {
      if (selectedManga) {
        const res = await isInProgress(selectedManga.id);
        setLecture(res);
      }
    };
    checkIsReadInProgress();
  }, [selectedManga]);

  const handleRead = async () => {
    // lógica para continuar o comenzar lectura
    if (lecture != null) {
      await fetchChapterById(lecture.chapterId);
      router.push(`/(app)/reader/${lecture.chapterId}`);
    }
  };

  const handleFavoriteTouch = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVolumenTouch = (entry: Volume) => {
    setSelectedVolume(entry);
    router.push(`/(app)/(manga)/volume/${entry.id}`);
  };

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Banner */}
      <View className="pt-20 relative rounded-2xl overflow-hidden">
        <Image
          source={{ uri: selectedManga?.coverUrl }}
          className="h-[240px] w-full rounded-2xl"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.95)"]}
          className="absolute inset-0"
        />
        <View className="absolute bottom-4 left-5 right-5">
          <Text className="text-white text-3xl font-extrabold mb-1">
            {selectedManga?.title}
          </Text>
          <View className="flex flex-row items-center gap-x-6">
            {selectedManga?.rating != null && (
              <View className="flex-row items-center">
                <FontAwesome name="star" size={14} color="gold" />
                <Text className="text-white ml-1">{selectedManga.rating}</Text>
              </View>
            )}
            <View className="flex-row items-center">
              <FontAwesome name="eye" size={14} color="white" />
              <Text className="text-white ml-1">
                {selectedManga?.chaptersCount} capítulos
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Botones de acción */}
      <View className="flex-row justify-between items-center mt-6 px-2">
        <TouchableOpacity
          onPress={handleFavoriteTouch}
          className="bg-neutral-800 p-4 rounded-full shadow-sm"
        >
          <FontAwesome
            name="heart"
            size={20}
            color={isFavorite ? "white" : "#aaa"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRead}
          className="bg-primary px-6 py-4 rounded-full shadow-md"
        >
          <Text className="text-white text-lg font-bold">
            {lecture ? "Continuar" : "Leer"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sinopsis */}
      <View className="mt-8 px-2">
        <Text className="text-white text-2xl font-bold mb-2">Sinopsis</Text>
        <Text className="bg-neutral-800 text-white text-base leading-relaxed p-4 rounded-xl">
          {selectedManga?.description}
        </Text>
      </View>

      {/* Volúmenes */}
      <View className="mt-10 px-2">
        <Text className="text-white text-2xl font-bold mb-4">Volúmenes</Text>
        <FlatList
          data={volumesOfSelectedManga}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => handleVolumenTouch(item)}
              className="mr-4"
            >
              <SmallCoverCard title={item.title} image={item.coverUrl} />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </Animated.ScrollView>
  );
};

export default MangaDetailScreen;
