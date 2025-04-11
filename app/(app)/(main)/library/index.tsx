// app/busqueda/index.tsx
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useContent } from "@/hooks/useContent";
import { Manga } from "@/dtos/mangareader.dto";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";

export default function LibraryScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mangasData, setMangasData] = useState<Manga[]>([]);
  const [filtered, setFiltered] = useState<Manga[]>([]);
  const [searchError, setSearchError] = useState("");

  const { fetchAllmangas, contentError, contentLoading } = useContent();

  // Obtener mangas al renderizar
  useEffect(() => {
    const getLibrary = async () => {
      try {
        const mangasFetched: Manga[] = await fetchAllmangas();
        setMangasData(mangasFetched);
        setFiltered(mangasFetched); // ← esto asegura que el FlatList tenga contenido inicial
      } catch (e) {
        console.error("Error fetching mangas:", e);
      }
    };
    getLibrary();
  }, []);

  const handleSearch = () => {
    const results = mangasData.filter((manga) =>
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
    setFiltered(mangasData);
    setSearchError("");
  };

  return (
    <View className="flex-1 bg-black p-4">
      {/* Search Bar */}
      <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-2 mb-4">
        <TextInput
          placeholder="Manga/Autor"
          placeholderTextColor="#aaa"
          className="flex-1 text-white"
          value={query}
          onChangeText={setQuery}
        />
        <Pressable onPress={handleClear}>
          <Text className="text-white font-bold mx-2">✖</Text>
        </Pressable>
        <Pressable onPress={handleSearch}>
          <Text className="text-white font-bold">🔍</Text>
        </Pressable>
      </View>

      {/* Error de búsqueda */}
      {searchError ? (
        <Text className="text-red-500 text-center mb-4 font-bold">{searchError}</Text>
      ) : null}

      {/* Loader o error de contenido general */}
      {contentLoading ? (
        <View className="flex-1 justify-center items-center mt-20">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-4">Cargando mangas...</Text>
        </View>
      ) : contentError ? (
        <Text className="text-red-500 text-center mt-10 font-bold">
          {contentError.message}
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
              onPress={() => router.push(`/(app)/(manga)/${item.id}`)}
              className="mb-6 w-[48%]"
            >
              <SmallCoverCard title={item.title} image={item.coverUrl}></SmallCoverCard>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
