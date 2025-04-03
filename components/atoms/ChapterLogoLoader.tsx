import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'

interface ChapterLogoLoaderProps {
	logoUrl: string
	totalImages: number
}

const ChapterLogoLoader = ({ logoUrl, totalImages }: ChapterLogoLoaderProps) => {
	const [loadedImages, setLoadedImages] = useState(0)

	const logoColorPercentage =
		((totalImages - loadedImages) / totalImages) * 100

	useEffect(() => {
		const loadImage = () => {
			setTimeout(() => {
				setLoadedImages((prev) => prev + 1)
			}, 500)
		}

		if (loadedImages < totalImages) {
			loadImage()
		}
	}, [loadedImages])

	return (
		<View className="relative w-[200px] h-[200px]">
			<Image
				source={{ uri: logoUrl }}
				className="w-full h-full"
				resizeMode="contain"
			/>
			<View
				className="absolute top-0 right-0 bottom-0 bg-black/50"
				style={{ width: `${logoColorPercentage}%` }}
			/>
		</View>
	)
}

export default ChapterLogoLoader
