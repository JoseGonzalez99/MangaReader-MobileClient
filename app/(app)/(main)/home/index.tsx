import BigCoverCard from "@/components/atoms/BigCoverCard";
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

export default function HomeScreen() {
  const router = useRouter();
  //const { lastRead, history = [], upcoming = [] } = useContent();
  const lastRead: ReadingEntry | null = {
    mangaId: "a6c84040-cfcd-4a6f-b005-643b96385281",
    mangaTitle: "Berserk",
    coverUrl:
      "https://mrwallpaper.com/images/hd/download-berserk-wallpaper-xuc3lwbexky9xyz1.jpg",
    faviconUrl:
      "https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg",
    chapterId: "64fa9123-4b15-4640-afbf-470587d7bd57",
    lastPageRead: 1,
    lastReadAt: "2025-04-07T14:35:39.585Z",
    status: "IN_PROGRESS",
  };

  const history: ReadingEntry[] = [];

  const upcoming: ReadingEntry[] = [];

  const handleMangaLastReadPress = (entry: ReadingEntry) => {
    // Aquí podrías navegar a un lector o detalles
    router.push(`/(app)/(manga)/${entry.mangaId}`);
  };
  const handleMangaPress = (entry: ReadingEntry) => {
    if (entry?.chapterId) {
      router.push(`/reader/${entry.chapterId}`);
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
            onPress={() => handleMangaLastReadPress(lastRead)}
          >
            <BigCoverCard
              title={lastRead.mangaTitle}
              rating={10}
              image={lastRead.coverUrl}
            />
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
                onPress={() => handleMangaPress(item)}
              >
                <SmallCoverCard title={item.mangaTitle} image={item.coverUrl} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
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
