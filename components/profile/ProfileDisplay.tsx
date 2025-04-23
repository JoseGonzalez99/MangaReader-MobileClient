import { View, Text, Pressable } from 'react-native'

export default function ProfileDisplay({ fullName, email, onEdit, onLogout }: {
  fullName: string
  email: string
  onEdit: () => void
  onLogout: () => void
}) {
  return (
    <View className="space-y-4">
      <Text className="text-white text-lg">Nombre: {fullName}</Text>
      <Text className="text-white text-lg mb-4">Email: {email}</Text>

      <Pressable
        onPress={onEdit}
        className="bg-blue-600 py-2 px-4 rounded-lg w-fit"
      >
        <Text className="text-white font-semibold text-center">Editar datos</Text>
      </Pressable>

      <Pressable onPress={onLogout}>
        <Text className="text-white text-lg">Cerrar sesión</Text>
      </Pressable>
    </View>
  )
}
