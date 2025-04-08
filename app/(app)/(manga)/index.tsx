import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import SmallCoverCard from '@/components/atoms/SmallCoverCard'

const MangaDetailScreen = () => {
  const navigation = useNavigation()
  const [isFavorite, setIsFavorite] = useState(false)

  const volumes = [
    { id: '1', title: 'Volumen 1 - Arco de la destruccion', image: 'https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg' },
    { id: '2', title: 'Volumen 2 - Arco del halcon milagroso', image: 'https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg' },
    { id: '3', title: 'Volumen 3 - La era dorada', image: 'https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg' },
  ]

  const handleRead = () => {
    // lógica para continuar o comenzar lectura
  }
  const handleFavoriteTouch = ()=>{
    setIsFavorite(!isFavorite)
  }

  return (
    <ScrollView className="flex-1 bg-background px-4">
      <View className="mt-4 relative rounded-2xl overflow-hidden">
        <Image
          source={{ uri: 'https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg' }}
          className=" h-[220px] rounded-2xl"
          resizeMode="stretch"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}
          className="absolute inset-0"
        />
        <TouchableOpacity className="absolute top-3 left-3 p-2 " onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="absolute top-3 right-3 p-2">
          <Entypo name="share" size={20} color="white" />
        </TouchableOpacity>

        <View className="absolute bottom-3 left-4">
          <Text className="text-white text-4xl font-extrabold">Berserk</Text>
          <View className="flex flex-row  ">
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
          <FontAwesome className='pl-8 pr-8' name="heart" size={20} color={isFavorite ? 'white' : '#ddd'} />
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
      Berserk es una historia de fantasía oscura y terror que sigue a Guts, un espadachín solitario y maldito. La trama se desarrolla en un mundo donde la fuerza es lo más importante. 

      </Text>

      <Text className="text-white text-3xl font-bold mt-8 mb-2">Volumenes</Text>
      <FlatList
        data={volumes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SmallCoverCard title={item.title} image={item.image} />
        )}
        contentContainerStyle={{ paddingBottom: 40 ,gap:20}}
      />
    </ScrollView>
  )
}

export default MangaDetailScreen
