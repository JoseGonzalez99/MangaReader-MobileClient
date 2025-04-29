import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { ReadingEntry, Volume } from "@/dtos/mangareader.dto";
import { useAppStore } from "@/store/Slices";
import { SmallSpinner } from "@/components/atoms/LoadingSpinner";
const MangaDetailScreen = () => {
  const { mangaId } = useLocalSearchParams<{ mangaId: string }>();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  /*Lista de estados globales */
  const selectedManga = useAppStore((s) => s.selectedManga);
  const setSelectedVolume = useAppStore((s) => s.setSelectedVolume);
  const fetchVolumesByMangaId = useAppStore((s) => s.fetchVolumesByMangaId);
  const fetchChapterById = useAppStore((s) => s.fetchChapterById);
  const isInProgress = useAppStore((s) => s.isInProgress);
  const startNewLecture = useAppStore((s) => s.startNewLecture);
  const likeStatus = useAppStore((s) => s.likeStatus);
  const toggleLike = useAppStore((s) => s.toggleLike);


  const [lecture, setLecture] = useState<ReadingEntry | null>(null);
  const volumesOfSelectedManga = useAppStore((s) => s.volumesOfSelectedManga);

  const [loading,setLoading]= useState<boolean>(false);

  const getVolumes = useCallback(async () => {
    await fetchVolumesByMangaId(mangaId);
  }, [fetchVolumesByMangaId, mangaId]);

  const checkIsInFavorites = useCallback(async () => {
    if (selectedManga) {
      const res = await likeStatus(selectedManga.id);
      if (res != null) {
        setIsFavorite(res);
      }
    }
  }, [selectedManga, likeStatus]);

  const checkIsReadInProgress = useCallback(async () => {
    if (selectedManga) {
      const res = await isInProgress(selectedManga.id);
      if (res != null) {
        await fetchChapterById(res.chapterId);
      } else {
        await startNewLecture(selectedManga.id);
      }
      setLecture(res);
    }
  }, [selectedManga, isInProgress, fetchChapterById, startNewLecture]);

  // Ahora sí: loadData usando useCallback
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        checkIsInFavorites(),
        checkIsReadInProgress(),
        getVolumes(),
      ]);
    } catch (e) {
      console.error("Error loading manga data:", e);
    } finally {
      setLoading(false);
    }
  }, [checkIsInFavorites, checkIsReadInProgress, getVolumes]);

  // Obtener volumenes al renderizar
 // useEffect correcto
 useEffect(() => {
  loadData();
}, [loadData]);



  const handleRead = async () => {
    router.push(`/(app)/reader/newRead`);    
  };

  const handleFavoriteTouch = async () => {
    
   await toggleLike(selectedManga?.id as string,isFavorite);
   const res = await likeStatus(selectedManga?.id as string);
    setIsFavorite(res)
  };

  const handleVolumenTouch = (entry: Volume) => {
    setSelectedVolume(entry);
    router.push(`/(app)/(manga)/volume/${entry.id}`);
  };

  return (
    <ScrollView
      scrollEventThrottle={16}
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Banner */}
      <View className="rounded-2xl overflow-hidden">
        <Image
          source={{ uri: selectedManga?.coverUrl }}
          className="h-80 w-full rounded-2xl"
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
      <View className="flex-row justify-between items-center mt-4 px-2">
        <TouchableOpacity
          onPress={handleFavoriteTouch}
          className="bg-neutral-800 p-4 rounded-full shadow-sm"
        >
          {loading?(
            <SmallSpinner/>
          ):(<FontAwesome
            name="heart"
            size={20}
            color={isFavorite ? "#DA0037" : "white"}
          />)}
          
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRead}
          className="bg-primary px-6 py-4 rounded-full shadow-md"
        >
            {loading?(
            <SmallSpinner/>
          ):(<Text className="text-white text-lg font-bold">
            {lecture ? "Continuar" : "Leer"}
          </Text>)}
        </TouchableOpacity>
      </View>

      {/* Sinopsis */}
      <View className="mt-4 px-2">
        <Text className="text-white text-2xl font-bold mb-2">Sinopsis</Text>
        <Text className="bg-neutral-800 text-white text-base leading-relaxed p-4 rounded-xl">
          {selectedManga?.description}
        </Text>
      </View>

      {/* Volúmenes */}
      <View className="mt-4 px-2">
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
    </ScrollView>
  );
};

export default MangaDetailScreen;
