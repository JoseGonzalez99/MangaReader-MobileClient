import { ImageBackground, Text, View } from 'react-native'

interface SmallCoverCardProps {
	title: string
	image: string
}

const SmallCoverCard = ({ title, image }: SmallCoverCardProps) => {
	return (
		<ImageBackground
			source={{ uri: image }}
			className="h-[150px] w-[100px] rounded-lg overflow-hidden m-1 justify-end shadow-md"
			imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
			resizeMode="cover"
		>
			<View className="bg-black/60 px-2 py-1">
				<Text className="text-white text-sm font-semibold">{title}</Text>
			</View>
		</ImageBackground>
	)
}

export default SmallCoverCard
