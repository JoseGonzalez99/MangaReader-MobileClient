import BigCoverCard from '@/components/atoms/BigCoverCard';
import SmallCoverCard from '@/components/atoms/SmallCoverCard';
import { ReadingEntry } from '@/dtos/mangareader.dto';
import { ScrollView, FlatList, View, Text } from 'react-native';

export default function HomeScreen() {
  const lastRead: ReadingEntry = {
    mangaId: 'a6c84040-cfcd-4a6f-b005-643b96385281',
    mangaTitle: 'Berserk',
    coverUrl: 'https://www.nippon.com/es/ncommon/contents/japan-topics/1261990/1261990.jpg',
    faviconUrl: 'https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg',
    chapterId: '64fa9123-4b15-4640-afbf-470587d7bd57',
    lastPageRead: 1,
    lastReadAt: '2025-04-07T14:35:39.585Z',
    status: 'IN_PROGRESS',
  };

  const history: ReadingEntry[] = [lastRead];

  return (
    <ScrollView className=" bg-background px-4 pt-6">
      <View className="mb-10">
        <Text className="text-2xl font-bold text-white mb-5">Último leído</Text>
        <BigCoverCard
          title={lastRead.mangaTitle}
          rating={10}
          image={lastRead.coverUrl}
        />
      </View>

      <View className="mb-10">
        <Text className="text-2xl font-bold text-white mb-5">Historial</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <SmallCoverCard title={item.mangaTitle} image={item.coverUrl} />
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        />
      </View>
    </ScrollView>
  );
}
