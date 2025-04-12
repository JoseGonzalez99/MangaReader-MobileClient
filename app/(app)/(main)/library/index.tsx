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
  }, [mangas])
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
  console.log("🖱️ selectManga ejecutado:", manga.title);
  console.trace(); // ← te muestra de dónde se llamó realmente
  setSelectedManga(manga);
  router.push(`/(app)/(manga)/${manga.id}`);
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
              onPress={()=>selectManga(item)}
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
