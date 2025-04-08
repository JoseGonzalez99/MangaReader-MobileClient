// app/(app)/(manga)/volume/[volumeId].tsx
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Chapter } from '@/dtos/mangareader.dto';





export default function VolumenScreen() {
  const router = useRouter();
  const { volumeId } = useLocalSearchParams();

  const chapters:Chapter[] = [
    {
      id: '1067',
      volumeId:volumeId as unknown as string,
      chapterNumber:1067,
      title: 'Capitulo 1067',
      createdAt:"",
      updatedAt:""
    }
    ,
    {
      id: '1068',
      volumeId:volumeId as unknown as string,
      chapterNumber:1068,
      title: 'Capitulo 1068',
      createdAt:"",
      updatedAt:""
    },
    {
      id: '1069',
      volumeId:volumeId as unknown as string,
      chapterNumber:1069,
      title: 'Capitulo 1069',
      createdAt:"",
      updatedAt:""
    }
  ];

  const handleChapterTouch = (entry: Chapter) => {
    router.push(`/(app)/reader/${entry.id}`);
  };

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: 'https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg' }} // Aquí va la portada del volumen
        className="w-full h-60"
        resizeMode="cover"
      />
      <Text className="text-white text-center text-3xl font-bold mt-2">
        Volumen {volumeId}
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
              <Text className="text-white text-sm">Chapter {item.id}</Text>
              <Text className="text-primary font-bold">{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
