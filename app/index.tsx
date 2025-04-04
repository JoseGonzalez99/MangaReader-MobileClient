import { View, Text, Pressable, ScrollView } from 'react-native'
import { router } from 'expo-router'



const routes = [
  { label: '🏠 Home (Tabs)', path: '/(tabs)/home' },
  { label: '👤 Profile', path: '/(tabs)/profile' },
  { label: '📖 Reader', path: '/Reader' },
  { label: '🔐 Login', path: '/login' },
]

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-background px-6 py-10">
      <Text className="text-white text-2xl font-bold mb-6 text-center">🚀 Rutas de prueba</Text>

      {routes.map((route) => (
        <Pressable
          key={route.path}
          onPress={() => router.push(route.path as any)}
          className="bg-secondary p-4 rounded-xl mb-4 shadow-sm"
        >
          <Text className="text-white text-lg">{route.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}
