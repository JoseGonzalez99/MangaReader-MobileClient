import { useAppStore } from '@/store/Slices'
import { useState } from 'react'
import { View, TextInput, Pressable, Text, Alert } from 'react-native'

export default function ChangePasswordForm({ onClose }: { onClose?: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
    const resetPassword = useAppStore((s) => s.resetPassword)
  

  const handleChange = async () => {
    if (newPassword.length < 6) {
      return Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres.')
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'Las contraseñas no coinciden.')
    }

    try {
      setLoading(true)
      await resetPassword({
        currentPassword:currentPassword, newPassword:newPassword
        })
      Alert.alert('Éxito', 'Contraseña actualizada correctamente.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      onClose?.()
    } catch (err) {
      console.error(err)
      Alert.alert('Error', 'No se pudo cambiar la contraseña. Verifica tu contraseña actual.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="space-y-4">
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Contraseña actual"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Confirmar nueva contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Pressable
        onPress={handleChange}
        disabled={loading}
        className={`py-3 rounded-xl mt-2 ${loading ? 'bg-zinc-600' : 'bg-blue-600'}`}
      >
        <Text className="text-white text-center font-semibold">
          {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
        </Text>
      </Pressable>
    </View>
  )
}
