import BigCoverCard from "@/components/atoms/BigReadingEntryCard";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { ReadingEntry } from "@/dtos/mangareader.dto";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/Slices";
import BigReadingEntryCard from "@/components/atoms/BigReadingEntryCard";

export default function HomeScreen() {
  const router = useRouter();
  const fetchLastRead = useAppStore.getState().fetchLastRead;
  const fetchMangaById = useAppStore.getState().fetchMangaById;
  const [lastRead, setLastRead] = useState<ReadingEntry | null>();
  const fetchReadingHistory = useAppStore.getState().fetchReadingHistory;
  const [history, setHistory] = useState<ReadingEntry[]>([]);

  useEffect(() => {
    const getLastRead = async () => {
      const res = await fetchLastRead();
      setLastRead(res);
    };
    getLastRead();
  }, []);

  useEffect(() => {
    const gethistory = async () => {
      const res = await fetchReadingHistory();
      setHistory(res);
    };
    gethistory();
  }, []);

  const upcoming: ReadingEntry[] = [];//Mantener vacio mientras

  const handleEntryPress = async (entry: ReadingEntry) => {
    try {
      await fetchMangaById(entry.mangaId);
  
      // Confirmamos que selectedManga fue seteado correctamente
      const selected = useAppStore.getState().selectedManga;
  
      if (selected && selected.id === entry.mangaId) {
        router.push(`/(app)/(manga)/${entry.mangaId}`);
      } else {
        console.warn("Manga no se cargó correctamente o no coincide.");
      }
    } catch (err) {
      console.error("[HomeScreen] Error al obtener manga:", err);
    }
  };
  return (
    <ScrollView
      className="flex-1 bg-background px-4"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Último leído */}
      <View className="mb-10 mt-20">
        <Text className="text-white text-3xl font-bold mb-4">Último leído</Text>

        {lastRead ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleEntryPress(lastRead)}
          >
            <BigReadingEntryCard entry={lastRead}></BigReadingEntryCard>
          </TouchableOpacity>
        ) : (
          <View className="bg-zinc-800 rounded-lg p-5 items-center justify-center h-48">
            <Text className="text-white text-lg font-semibold text-center">
              Aún no has empezado a leer ningún manga.
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Cuando empieces a leer, aparecerá aquí tu último manga leído.
            </Text>
          </View>
        )}
      </View>

      {/* Historial */}
      <View className="mb-5">
        <Text className="text-white text-3xl font-bold mb-4">Historial</Text>
        {history.length > 0 ? (
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleEntryPress(item)}
              >
                <SmallCoverCard title={item.mangaTitle} image={item.coverUrl} />
              </TouchableOpacity>
            )}
            keyExtractor={(index) => index.toString()}
            horizontal
            contentContainerStyle={{ paddingBottom: 20, gap: 15 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text className="text-white  text-center opacity-70">
            No hay historial disponible.
          </Text>
        )}
      </View>

      {/* Próximamente */}
      <View className="mb-5">
        <Text className="text-white text-3xl font-bold mb-4">Próximamente</Text>
        {upcoming.length > 0 ? (
          <FlatList
            data={upcoming}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.85}>
                <SmallCoverCard title={item.mangaTitle} image={item.coverUrl} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={{ paddingBottom: 20, gap: 15 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text className="text-white text-center opacity-70">
            Nada por venir aún.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
