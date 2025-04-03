import React, { useEffect, useState, useCallback } from 'react'
import { Animated, Dimensions, Modal, Pressable, View } from 'react-native'

const { height } = Dimensions.get('window')

interface BottomDrawerProps {
	isVisible: boolean
	onClose: () => void
	children: React.ReactNode
}

const BottomDrawer = ({ isVisible, onClose, children }: BottomDrawerProps) => {
	const [visible, setVisible] = useState(isVisible)
	const slideAnim = useState(new Animated.Value(height))[0]

	// Animación de entrada y salida
	const animateDrawer = useCallback(
		(toValue: number, onAnimationEnd?: () => void) => {
			Animated.timing(slideAnim, {
				toValue,
				duration: 300,
				useNativeDriver: true,
			}).start(() => {
				onAnimationEnd?.()
			})
		},
		[slideAnim]
	)

	useEffect(() => {
		if (isVisible) {
			setVisible(true)
			animateDrawer(0)
		} else {
			animateDrawer(height, () => setVisible(false))
		}
	}, [isVisible, animateDrawer])

	if (!visible) return null

	return (
		<Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
			<Pressable
				className="flex-1 bg-black/50"
				onPress={onClose}
			/>

			<Animated.View
				style={{ transform: [{ translateY: slideAnim }] }}
				className="absolute bottom-0 left-0 right-0 max-h-[80%] bg-secondary rounded-t-2xl p-5"
			>
				{/* Handle visual */}
				<View className="w-12 h-1.5 bg-white/40 rounded-full mx-auto mb-3" />

				{children}
			</Animated.View>
		</Modal>
	)
}

export default BottomDrawer
