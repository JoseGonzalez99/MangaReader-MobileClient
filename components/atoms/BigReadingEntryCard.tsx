import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { ReadingEntry } from '@/dtos/mangareader.dto'

interface BigReadingEntryCardProps {
	entry:ReadingEntry
}

const BigReadingEntryCard = ({ entry }: BigReadingEntryCardProps) => {
	return (
		<View className="rounded-2xl overflow-hidden shadow-2xl ">
			<ImageBackground
				source={{ uri: entry.coverUrl }}
				className="h-[220px] justify-end"
				imageStyle={{ borderRadius: 20 }}
				resizeMode="stretch"
			>
				{/* Gradiente de fondo para oscurecer la parte inferior */}
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.85)']}
					start={{ x: 0.5, y: 0.7 }}
					end={{ x: 0.5, y: 1 }}
					className="absolute inset-0"
				/>

				{/* BlurView opcional para un efecto elegante */}
				<View className="">
					<BlurView intensity={70} tint="dark" className="rounded-xl p-3 flex-row justify-between items-center">
						<Text className="text-white text-3xl font-bold w-3/4" numberOfLines={2}>
							{entry.mangaTitle}
						</Text>

						<View className="flex-row items-center ml-3">
							<Text className="text-white text-xs ml-1">
								{
								entry.status == "IN_PROGRESS" && "EN PROGRESO"
								}</Text>
						</View>
					</BlurView>
				</View>
			</ImageBackground>
		</View>
	)
}

export default BigReadingEntryCard
