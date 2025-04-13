import React from 'react';
import { Text, View } from 'react-native';
import ReaderModeButton from '../atoms/ReaderModeButton';
import { useAppStore } from '@/store/Slices';


const ReaderParams = () => {
    const usePreference= useAppStore((s)=>s.userPreferences);
    const updateUserPreferences= useAppStore((s)=>s.updateUserPreferences)
    const selectedReaderOrientation= usePreference?.readingDirection;

	const onNormalButton = () => updateUserPreferences('ltr');
	const onJapanModeButton = () => updateUserPreferences('rtl');

	return (
		<View className="flex-1 items-center bg-secondary px-4 py-6">

			<View className="flex-row justify-between items-center p-3 rounded mb-4 w-full">
				<View className="flex-1">
					<Text className="text-white text-base">Orientación de lectura</Text>
				</View>

				<View className="flex-row justify-around flex-2 gap-2">
					<ReaderModeButton
						title="Normal"
						icon="arrow-right"
						active={selectedReaderOrientation === 'rtl'}
						handlePress={onNormalButton}
					/>
					<ReaderModeButton
						title="Japones"
						icon="arrow-left"
						active={selectedReaderOrientation === 'ltr'}
						handlePress={onJapanModeButton}
					/>
				</View>
			</View>
		</View>
	);
};

export default ReaderParams;
