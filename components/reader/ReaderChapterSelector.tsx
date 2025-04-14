import { Chapter } from '@/dtos/mangareader.dto';
import { useAppStore } from '@/store/Slices';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const ReaderChapterSelector = () => {
	const selectedChapter = useAppStore((s) => s.selectedChapter);
	const chaptersList = useAppStore((s) => s.chapters);
	const setSelectedChapter = useAppStore((s) => s.setSelectedChapter);

	const handleChapterSelection = (chapter: Chapter) => {
		setSelectedChapter(chapter);
	};

	const renderItem = ({ item }: { item: Chapter }) => {
		const isSelected = item.id === selectedChapter?.id;

		return (
			<TouchableOpacity
				onPress={() => handleChapterSelection(item)}
				className={`p-3 ${isSelected ? 'bg-red-600 rounded-lg' : ''}`}
			>
				<Text className="text-base text-white">{item.title}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			data={chaptersList}
			renderItem={renderItem}
			keyExtractor={(item) => item.id.toString()}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: 20,
				paddingTop: 10,
			}}
			ListHeaderComponent={
				<Text className="text-white text-md font-bold mb-4 text-center">
					Seleccionar capítulo
				</Text>
			}
		/>
	);
};

export default ReaderChapterSelector;
