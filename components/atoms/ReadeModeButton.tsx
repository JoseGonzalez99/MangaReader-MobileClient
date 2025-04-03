import React, { useRef } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

interface ReaderModeButtonProps {
	title: string
	icon: any
	active: boolean
	handlePress: () => void
}

const ReaderModeButton = ({
	title,
	icon,
	active,
	handlePress,
}: ReaderModeButtonProps) => {
	const scale = useRef(new Animated.Value(1)).current

	const handlePressIn = () => {
		Animated.spring(scale, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start()
	}

	const handlePressOut = () => {
		Animated.spring(scale, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start()
	}

	const iconColor = active ? '#ffffff' : '#9ca3af'

	return (
		<Pressable
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			accessibilityRole="button"
		>
			<Animated.View
				style={{ transform: [{ scale }] }}
				className={`w-[60px] h-[60px] justify-center items-center rounded-lg m-2 transition-all duration-150 ${
					active
						? 'bg-primary'
						: 'bg-secondary border-2 border-primary'
				}`}
			>
				<FontAwesome name={icon} size={24} className="mb-1" color={iconColor} />
				<Text className="text-[12px] text-white">{title}</Text>
			</Animated.View>
		</Pressable>
	)
}

export default ReaderModeButton
