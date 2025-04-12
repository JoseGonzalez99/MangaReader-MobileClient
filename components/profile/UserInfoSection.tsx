import { useRouter } from 'expo-router'
import { View, Text, Pressable, TextInput, Modal, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { BlurView } from 'expo-blur'
import { useAppStore } from '@/store/Slices'

export default function UserInfoSection() {
  const router = useRouter()

  const user = useAppStore((s) => s.appUser);

  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState('admin')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const clearUser = useAppStore((s) => s.clearUser);

  const logout = useAppStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
     clearUser();
    router.replace('/(auth)/login')
  }

  const handleDeleteAccount = () => {
    Alert.alert('Eliminar cuenta', 'Tu cuenta ha sido eliminada.')
  }

  const handleSave = () => {
    setModalVisible(true)
    setEditing(false)
  }

  const renderForm = () => (
    <View className="space-y-4">
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={handleSave} className="bg-blue-600 py-3 rounded-xl mt-2">
        <Text className="text-white text-center font-semibold">Guardar cambios</Text>
      </Pressable>
    </View>
  )

  return (
    <View className="relative">
      {editing && (
        <BlurView intensity={40} tint="dark" className="absolute -inset-6 z-10 rounded-lg" />
      )}

      <View className={`space-y-6 ${editing ? 'z-20 relative' : ''}`}>
        <Text className="text-white text-2xl font-bold mb-1">Perfil de Usuario</Text>

        {!editing ? (
          <>
            <Text className="text-white text-lg">Nombre: {fullName}</Text>
            <Text className="text-white text-lg mb-4">Email: {email}</Text>

            <Pressable
              onPress={() => setEditing(true)}
              className="bg-blue-600 py-2 px-4 rounded-lg w-fit"
            >
              <Text className="text-white font-semibold text-center">Editar datos</Text>
            </Pressable>

            <Pressable onPress={handleLogout}>
              <Text className="text-white text-lg">Cerrar sesión</Text>
            </Pressable>

            <Pressable onPress={handleDeleteAccount}>
              <Text className="text-red-500 text-lg">Eliminar cuenta</Text>
            </Pressable>
          </>
        ) : (
          renderForm()
        )}
      </View>

      {/* Modal confirmación */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable
          onPress={() => setModalVisible(false)}
          className="flex-1 justify-center items-center bg-black/60"
        >
          <View className="bg-zinc-900 rounded-xl w-4/5 p-6">
            <Text className="text-white text-lg font-bold mb-4">Cambios guardados</Text>
            <Text className="text-gray-300 mb-4">
              Tus datos han sido actualizados correctamente.
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-blue-600 py-3 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">Entendido</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}
