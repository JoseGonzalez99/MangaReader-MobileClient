// app/busqueda/index.tsx
import { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const mangasData = [
  {
    id: '1',
    title: 'Berserk',
    image: 'https://mrwallpaper.com/images/hd/download-berserk-wallpaper-xuc3lwbexky9xyz1.jpg',
  },
  {
    id: '2',
    title: 'Naruto',
    image: 'https://th.bing.com/th/id/OIP.EjIl-g-wSybkVtNApisWMwHaLH?rs=1&pid=ImgDetMain',
  },
  {
    id: '3',
    title: 'Bleach',
    image: 'https://th.bing.com/th/id/R.98dffbb5e325f0b41c817bda7bd9cda2?rik=11AIeHrwXfNO2A&riu=http%3a%2f%2fes.web.img3.acsta.net%2fr_1280_720%2fpictures%2f16%2f02%2f03%2f17%2f47%2f271248.jpg&ehk=1TFFCPiuhlVB70HSMlpD0YbCZzMEraquP3KvYGjjUmw%3d&risl=&pid=ImgRaw&r=0',
  },
];

export default function LibraryScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(mangasData);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const results = mangasData.filter((manga) =>
      manga.title.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
      setError('No se encontró ningún manga con ese nombre.');
    } else {
      setError('');
    }
    setFiltered(results);
  };

  const handleClear = () => {
    setQuery('');
    setFiltered(mangasData);
    setError('');
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

      {/* Error */}
      {error ? (
        <Text className="text-red-500 text-center mb-4 font-bold">{error}</Text>
      ) : null}

      {/* Grid of mangas */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/volumen/${item.id}`)}
            className="mb-6 w-[48%]"
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-44 rounded-xl"
              resizeMode="cover"
            />
            <Text className="text-white text-center mt-2">{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
