// components/profile/ReadingPreferencesSection.tsx
import React, { useState } from 'react'
import { View, Text, Pressable, Modal, Alert } from 'react-native'

export default function ReadingPreferencesSection() {
  const [readingDirection, setReadingDirection] = useState<'ltr' | 'rtl' | 'vertical'>('ltr')
  const [defaultProvider, setDefaultProvider] = useState('MangaPlus')
  const [isDirectionPickerVisible, setDirectionPickerVisible] = useState(false)
  const [isProviderPickerVisible, setProviderPickerVisible] = useState(false)

  const readingOptions = [
    { label: 'Izquierda a derecha', value: 'ltr' },
    { label: 'Derecha a izquierda', value: 'rtl' },
    { label: 'Uno debajo del otro', value: 'vertical' },
  ]
  const providerOptions = ['MangaPlus', 'ComicWorld', 'WebtoonX', 'Otro']

  const handleClearData = () => {
    Alert.alert('Limpiar datos', 'Historial y preferencias han sido reseteadas.')
  }

  return (
    <View>
      <Text className="text-white text-xl font-semibold mb-4">Preferencias del lector</Text>

      <View className="mb-4">
        <Text className="text-white mb-2">Dirección de lectura por defecto:</Text>
        <Pressable
          onPress={() => setDirectionPickerVisible(true)}
          className="bg-secondary px-4 py-2 rounded-lg"
        >
          <Text className="text-white">
            {readingOptions.find((opt) => opt.value === readingDirection)?.label}
          </Text>
        </Pressable>
      </View>

      <View className="mb-6">
        <Text className="text-white mb-2">Proveedor por defecto:</Text>
        <Pressable
          onPress={() => setProviderPickerVisible(true)}
          className="bg-secondary px-4 py-2 rounded-lg"
        >
          <Text className="text-white">{defaultProvider}</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleClearData}
        className="bg-secondary py-3 px-4 rounded-xl border border-white/10"
      >
        <Text className="text-white text-center font-medium">Limpiar datos de la app</Text>
      </Pressable>

      {/* MODALS */}
      <Modal transparent visible={isDirectionPickerVisible} animationType="fade">
        <Pressable
          onPress={() => setDirectionPickerVisible(false)}
          className="flex-1 justify-center items-center bg-black/60"
        >
          <View className="bg-zinc-800 rounded-xl w-3/4 p-4">
            <Text className="text-white text-lg font-semibold mb-4">Seleccionar dirección</Text>
            {readingOptions.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => {
                  setReadingDirection(opt.value as any)
                  setDirectionPickerVisible(false)
                }}
                className="py-2"
              >
                <Text className="text-white text-base">{opt.label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      <Modal transparent visible={isProviderPickerVisible} animationType="fade">
        <Pressable
          onPress={() => setProviderPickerVisible(false)}
          className="flex-1 justify-center items-center bg-black/60"
        >
          <View className="bg-zinc-800 rounded-xl w-3/4 p-4">
            <Text className="text-white text-lg font-semibold mb-4">Seleccionar proveedor</Text>
            {providerOptions.map((provider) => (
              <Pressable
                key={provider}
                onPress={() => {
                  setDefaultProvider(provider)
                  setProviderPickerVisible(false)
                }}
                className="py-2"
              >
                <Text className="text-white text-base">{provider}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
