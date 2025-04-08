import BigCoverCard from "@/components/atoms/BigCoverCard";
import SmallCoverCard from "@/components/atoms/SmallCoverCard";
import { ReadingEntry } from "@/dtos/mangareader.dto";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
	const router = useRouter();

	const lastRead: ReadingEntry = {
		mangaId: "a6c84040-cfcd-4a6f-b005-643b96385281",
		mangaTitle: "Berserk",
		coverUrl: "https://mrwallpaper.com/images/hd/download-berserk-wallpaper-xuc3lwbexky9xyz1.jpg",
		faviconUrl: "https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg",
		chapterId: "64fa9123-4b15-4640-afbf-470587d7bd57",
		lastPageRead: 1,
		lastReadAt: "2025-04-07T14:35:39.585Z",
		status: "IN_PROGRESS"
	};

	const history: ReadingEntry[] = [
		{
			mangaId: "a6c84040-cfcd-4a6f-b005-643b96385282",
			mangaTitle: "Attack on Titan",
			coverUrl: "https://4.bp.blogspot.com/-bFI3nnZiBy4/WIpe-AqSKqI/AAAAAAAAALs/25vg-stsz2oTUVVP7-11HqHJZxMGwYNwgCEw/s1600/shingeki_no_kyojin_poster_by_thebellealexandra-d75f1z1.png",
			faviconUrl: "https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg",
			chapterId: "64fa9123-4b15-4640-afbf-470587d7bd57",
			lastPageRead: 1,
			lastReadAt: "2025-04-07T14:35:39.585Z",
			status: "IN_PROGRESS"
		},
		{
			mangaId: "a6c84040-cfcd-4a6f-b005-643b963852232",
			mangaTitle: "Naruto",
			coverUrl: "https://th.bing.com/th/id/OIP.EjIl-g-wSybkVtNApisWMwHaLH?rs=1&pid=ImgDetMain",
			faviconUrl: "https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg",
			chapterId: "64fa9123-4b15-4640-afbf-470587d7bd57",
			lastPageRead: 1,
			lastReadAt: "2025-04-07T14:35:39.585Z",
			status: "IN_PROGRESS"
		},
		{
			mangaId: "a6c84040-cfcd-4a6f-b005-6e22963852232",
			mangaTitle: "Bleach",
			coverUrl: "https://th.bing.com/th/id/R.98dffbb5e325f0b41c817bda7bd9cda2?rik=11AIeHrwXfNO2A&riu=http%3a%2f%2fes.web.img3.acsta.net%2fr_1280_720%2fpictures%2f16%2f02%2f03%2f17%2f47%2f271248.jpg&ehk=1TFFCPiuhlVB70HSMlpD0YbCZzMEraquP3KvYGjjUmw%3d&risl=&pid=ImgRaw&r=0",
			faviconUrl: "https://i.pinimg.com/736x/c3/92/e9/c392e9650f94bbec2be33c53bbea1f95.jpg",
			chapterId: "64fa9123-4b15-4640-afbf-470587d7bd57",
			lastPageRead: 1,
			lastReadAt: "2025-04-07T14:35:39.585Z",
			status: "IN_PROGRESS"
		},
		lastRead
	];

	const handleMangaLastReadPress = (entry: ReadingEntry) => {
		// Aquí podrías navegar a un lector o detalles
		router.push(`/(app)/(manga)`);
	};
	const handleMangaHistoryPress = (entry: ReadingEntry) => {
		// Aquí podrías navegar a un lector o detalles
		router.push(`/reader/${entry.chapterId}`);
	};

	return (
		<ScrollView
			className="flex-1 bg-background px-4"
			contentContainerStyle={{ paddingBottom: 100 }}
		>
			<View className="mb-10 mt-20">
				<Text className="text-white text-3xl font-bold mb-4">Último leído</Text>
				<TouchableOpacity activeOpacity={0.9} onPress={() => handleMangaLastReadPress(lastRead)}>
					<BigCoverCard title={lastRead.mangaTitle} rating={10} image={lastRead.coverUrl} />
				</TouchableOpacity>
			</View>

			<View className="mb-5">
				<Text className="text-white text-3xl font-bold mb-4">Historial</Text>
				<FlatList
					data={history}
					renderItem={({ item }) => (
						<TouchableOpacity activeOpacity={0.85} onPress={() => handleMangaHistoryPress(item)}>
							<SmallCoverCard title={item.mangaTitle} image={item.coverUrl} />
						</TouchableOpacity>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					contentContainerStyle={{ paddingBottom: 20,gap:15 }}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<View className="mb-5">
				<Text className="text-white text-3xl font-bold mb-4">Proximamente</Text>
				<FlatList
					data={history}
					renderItem={({ item }) => (
						<TouchableOpacity activeOpacity={0.85} >
							<SmallCoverCard title={item.mangaTitle} image={item.coverUrl} />
						</TouchableOpacity>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal
					contentContainerStyle={{ paddingBottom: 20,gap:15 }}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		</ScrollView>
	);
}
