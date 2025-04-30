import React from 'react'
import { Image, Text, View } from 'react-native'

interface AppLogoProps {
  imageUrl: any
}

const AppLogo = ({ imageUrl }: AppLogoProps) => {
  return (
    <View className="items-center justify-center p-2">
      <Image
        source={imageUrl}
        className="w-[250px] h-[250px] mb-0"
        resizeMode="contain"
      />
    </View>
  )
}

export default AppLogo
