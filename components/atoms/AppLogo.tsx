import React from 'react'
import { Image, Text, View } from 'react-native'

interface AppLogoProps {
  imageUrl: any
  subText: string
}

const AppLogo = ({ imageUrl, subText }: AppLogoProps) => {
  return (
    <View className="items-center justify-center p-5">
      <Image
        source={imageUrl}
        className="w-[250px] h-[250px] mb-0"
        resizeMode="contain"
      />
      <Text className="text-text text-4xl font-bold">{subText}</Text>
    </View>
  )
}

export default AppLogo
