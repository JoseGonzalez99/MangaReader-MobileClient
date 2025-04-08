import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'

interface BigCoverCardProps {
	title: string
	rating: number
	image: string
}

const BigCoverCard = ({ title, rating, image }: BigCoverCardProps) => {
	return (
		<View className="rounded-2xl overflow-hidden shadow-2xl ">
			<ImageBackground
				source={{ uri: image }}
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
				<View className="p-5">
					<BlurView intensity={35} tint="dark" className="rounded-xl p-3 flex-row justify-between items-center">
						<Text className="text-white text-3xl font-bold w-3/4" numberOfLines={2}>
							{title}
						</Text>

						<View className="flex-row items-center ml-3">
							<FontAwesome name="star" size={25} color="#FFD700" />
							<Text className="text-white text-base ml-1">{rating}</Text>
						</View>
					</BlurView>
				</View>
			</ImageBackground>
		</View>
	)
}

export default BigCoverCard
