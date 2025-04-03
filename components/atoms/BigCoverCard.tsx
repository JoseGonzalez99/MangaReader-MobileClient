import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, Text, View } from 'react-native'

interface BigCoverCardProps {
	title: string
	rating: number
	image: string
}

const BigCoverCard = ({ title, rating, image }: BigCoverCardProps) => {
	return (
		<View className="rounded-2xl overflow-hidden shadow-xl mx-4 my-6">
			<ImageBackground
				source={{ uri: image }}
				className="h-[420px] justify-end"
				imageStyle={{ borderRadius: 16 }}
				resizeMode="cover"
			>
				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
					start={{ x: 0.5, y: 0.3 }}
					end={{ x: 0.5, y: 1 }}
					className="absolute inset-0"
				/>

				<View className="flex-row justify-between items-end p-5">
					<Text className="text-white text-3xl font-extrabold drop-shadow-lg w-3/4">
						{title}
					</Text>

					<View className="flex-row items-center">
						<FontAwesome name="star" size={20} color="#FFD700" />
						<Text className="text-white text-lg ml-1">{rating}</Text>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}

export default BigCoverCard
