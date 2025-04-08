import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { Volume } from "@/dtos/mangareader.dto";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useScrollY } from "@/hooks/useScrollY";
const MangaDetailScreen = () => {
  const { mangaId } = useLocalSearchParams<{ mangaId: string }>();
  const router = useRouter();
  const scrollY = useScrollY();
  const [isFavorite, setIsFavorite] = useState(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const volumes: Volume[] = [
    {
      id: "1",
      mangaId: mangaId,
      volumeNumber: 1,
      title: "Volumen 1 - Arco de la destrucción",
      coverUrl:
        "https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg",
      createdAt: "",
      updatedAt: "",
    },
  ];

  const handleRead = () => {
    // lógica para continuar o comenzar lectura
  };

  const handleFavoriteTouch = () => {
    setIsFavorite(!isFavorite);
  };

  const handleVolumenTouch = (entry: Volume) => {
    router.push(`/(app)/(manga)/volume/${entry.id}`);
  };

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      className="flex-1 bg-background"
    >
      <View className=" pt-20  relative rounded-2xl overflow-hidden">
        <Image
          source={{
            uri: "https://mrwallpaper.com/images/hd/download-berserk-wallpaper-xuc3lwbexky9xyz1.jpg",
          }}
          className="h-[220px] rounded-2xl"
          resizeMode="stretch"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
          className="absolute inset-0"
        />
        <View className="absolute bottom-3 left-4">
          <Text className="text-white text-4xl font-extrabold">Berserk</Text>
          <View className="flex flex-row">
            <View className="flex-row items-center pr-4">
              <FontAwesome name="star" size={14} color="gold" />
              <Text className="text-white ml-1">7.9</Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome name="eye" size={14} color="white" />
              <Text className="text-white ml-1">89,200</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-4">
        <TouchableOpacity
          onPress={handleFavoriteTouch}
          className="bg-primary p-4 rounded-full"
        >
          <FontAwesome
            name="heart"
            size={20}
            color={isFavorite ? "white" : "#ddd"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRead}
          className="bg-primary px-6 py-4 rounded-full"
        >
          <Text className="text-white text-lg font-bold">Leer | Continuar</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-white text-3xl font-bold mt-4 mb-2">Sinopsis</Text>
      <Text className="bg-neutral-800 text-lg text-white p-4 rounded-xl">
        Berserk es una historia de fantasía oscura y terror que sigue a Guts, un
        espadachín solitario y maldito. La trama se desarrolla en un mundo donde
        la fuerza es lo más importante.
        {mangaId}
      </Text>

      <Text className="text-white text-3xl font-bold mt-8 mb-2">Volúmenes</Text>
      <FlatList
        data={volumes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleVolumenTouch(item)}
          >
            <SmallCoverCard title={item.title} image={item.coverUrl} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40, gap: 20 }}
      />
    </Animated.ScrollView>
  );
};

export default MangaDetailScreen;
