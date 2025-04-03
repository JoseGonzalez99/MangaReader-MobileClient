import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'

interface SearchBarProps {
	placeholder: string
	onChangeText: (text: string) => void
	value: string
}

const SearchBar = ({ placeholder, onChangeText, value }: SearchBarProps) => {
	const [isFocused, setIsFocused] = useState(false)

	const handleClear = () => {
		onChangeText('')
	}

	return (
		<View
			className={`flex-row items-center bg-secondary rounded-xl px-4 py-2 mb-5 shadow-sm border transition-all ${
				isFocused ? 'border-primary' : 'border-transparent'
			}`}
		>
			<FontAwesome name="search" size={20} color="#000000" className="mr-2" />

			<TextInput
				className="flex-1 text-base text-background"
				placeholder={placeholder}
				placeholderTextColor="#888"
				onChangeText={onChangeText}
				value={value}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>

			{value.length > 0 && (
				<Pressable onPress={handleClear} className="ml-2 p-1 rounded-full bg-white/10">
					<FontAwesome name="close" size={18} color="#888" />
				</Pressable>
			)}
		</View>
	)
}

export default SearchBar
