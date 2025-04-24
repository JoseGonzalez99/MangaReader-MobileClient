// (main)/library/index.tsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Manga } from "@/dtos/mangareader.dto";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { useAppStore } from "@/store/Slices";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function LibraryScreen() {
  const router = useRouter();

  const mangas = useAppStore((s) => s.mangas);
  const fetchMangas = useAppStore((s) => s.fetchMangas);
  const loading = useAppStore((s) => s.loading);
  const error = useAppStore((s) => s.error);
  const setSelectedManga = useAppStore((s) => s.setSelectedManga);

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Manga[]>([]);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const load = async () => {
      await fetchMangas();
    };
    load();
  }, []);

  useEffect(() => {
    if (mangas.length > 0) {
      setFiltered(mangas);
    }
  }, [mangas]);
  const handleSearch = () => {
    const results = mangas.filter((manga) =>
      manga.title.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
      setSearchError("No se encontró ningún manga con ese nombre.");
    } else {
      setSearchError("");
    }
    setFiltered(results);
  };

  const handleClear = () => {
    setQuery("");
    setFiltered(mangas);
    setSearchError("");
  };

  const selectManga = (manga: Manga) => {
    setSelectedManga(manga);
    router.push(`/(app)/(manga)/${manga.id}`);
  };

  return (
    <View className="flex-1 bg-background p-4 pt-safe-or-10">
      {/* Search Bar */}
      <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-4 mb-4">
        <TextInput
          placeholder="Buscar manga o autor..."
          placeholderTextColor="#aaa"
          className="flex-1 text-white"
          value={query}
          onChangeText={setQuery}
        />

        {/* Botón de limpiar */}
        {query.length > 0 && (
          <Pressable onPress={handleClear} className="px-2">
            <Feather name="x-circle" size={20} color="#aaa" />
          </Pressable>
        )}

        {/* Botón de búsqueda */}
        <Pressable onPress={handleSearch} className="pl-2">
          <Feather name="search" size={20} color="white" />
        </Pressable>
      </View>

      {/* Error de búsqueda */}
      {searchError ? (
        <Text className="text-red-500 text-center mb-4 font-bold">
          {searchError}
        </Text>
      ) : null}

      {/* Loader o error de contenido general */}
      {loading ? (
        <View className="flex-1 justify-center items-center mt-20">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-4">Cargando mangas...</Text>
        </View>
      ) : error ? (
        <Text className="text-red-500 text-center mt-10 font-bold">
          {error.message}
        </Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => selectManga(item)}
              className="mb-6 w-[48%]"
            >
              <SmallCoverCard title={item.title} image={item.coverUrl} />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
