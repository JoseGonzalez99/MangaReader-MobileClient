import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Pressable, Alert, Modal } from 'react-native'

export default function ProfileScreen() {
  const [readingDirection, setReadingDirection] = useState<'ltr' | 'rtl' | 'vertical'>('ltr')
  const [defaultProvider, setDefaultProvider] = useState('MangaPlus')
  const [isDirectionPickerVisible, setDirectionPickerVisible] = useState(false)
  const [isProviderPickerVisible, setProviderPickerVisible] = useState(false)
const router = useRouter();

  const readingOptions = [
    { label: 'Izquierda a derecha', value: 'ltr' },
    { label: 'Derecha a izquierda', value: 'rtl' },
    { label: 'Uno debajo del otro', value: 'vertical' },
  ]

  const providerOptions = ['MangaPlus', 'ComicWorld', 'WebtoonX', 'Otro']

  const handleLogout = () => {
    router.push(`/(auth)/login`);
  }

  const handleDeleteAccount = () => {
    Alert.alert('Eliminar cuenta', 'Tu cuenta ha sido eliminada.')
  }

  const handleClearData = () => {
    Alert.alert(
      'Limpiar datos',
      'Se eliminarán la configuración del lector y el historial de lectura.'
    )
  }

  return (
    <View className="flex-1 bg-background p-6">
      {/* Email y acciones */}
      <Text className="text-white text-2xl font-bold mb-1">Perfil de Usuario</Text>
      <Text className="text-textMuted mb-6">usuario@email.com</Text>

      <Pressable onPress={handleLogout} className="mb-4">
        <Text className="text-white text-lg">Cerrar sesión</Text>
      </Pressable>

      <Pressable onPress={handleDeleteAccount} className="mb-6">
        <Text className="text-red-500 text-lg">Eliminar cuenta</Text>
      </Pressable>

      {/* Divider */}
      <View className="h-[1px] bg-white/10 my-6" />

      {/* Preferencias del lector */}
      <View className="mb-6">
        <Text className="text-white text-xl font-semibold mb-4">Preferencias del lector</Text>

        {/* Dirección de lectura */}
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

        {/* Proveedor por defecto */}
        <View>
          <Text className="text-white mb-2">Proveedor por defecto:</Text>
          <Pressable
            onPress={() => setProviderPickerVisible(true)}
            className="bg-secondary px-4 py-2 rounded-lg"
          >
            <Text className="text-white">{defaultProvider}</Text>
          </Pressable>
        </View>
      </View>

      {/* Limpiar datos */}
      <Pressable
        onPress={handleClearData}
        className="bg-secondary py-3 px-4 rounded-xl border border-white/10"
      >
        <Text className="text-white text-center font-medium">Limpiar datos de la app</Text>
      </Pressable>

      {/* Modal: Dirección de lectura */}
      <Modal visible={isDirectionPickerVisible} transparent animationType="fade">
        <Pressable
          onPress={() => setDirectionPickerVisible(false)}
          className="flex-1 justify-center items-center bg-black/60"
        >
          <View className="bg-secondary rounded-xl w-3/4 p-4">
            <Text className="text-white text-lg font-semibold mb-4">Seleccionar dirección</Text>
            {readingOptions.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => {
                  setReadingDirection(opt.value as 'ltr' | 'rtl' | 'vertical')
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

      {/* Modal: Proveedor por defecto */}
      <Modal visible={isProviderPickerVisible} transparent animationType="fade">
        <Pressable
          onPress={() => setProviderPickerVisible(false)}
          className="flex-1 justify-center items-center bg-black/60"
        >
          <View className="bg-secondary rounded-xl w-3/4 p-4">
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
