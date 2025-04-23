import { useState } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { useAppStore } from '@/store/Slices'

import ProfileDisplay from './ProfileDisplay'
import SaveConfirmationModal from './SaveConfirmationModal'
import ProfileForm from '../forms/ProfileForm'

export default function UserInfoSection() {
  const router = useRouter()
  const user = useAppStore((s) => s.appUser)

  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const clearUser = useAppStore((s) => s.clearUser)
  const logout = useAppStore((s) => s.logout)

  const handleLogout = async () => {
    await logout()
    clearUser()
    router.replace('/(auth)/login')
  }

  const handleSave = () => {
    setModalVisible(true)
    setEditing(false)
  }

  return (
    <View className="relative px-4 py-6">
      {editing && (
        <BlurView intensity={40} tint="dark" className="absolute -inset-6 z-10 rounded-lg" />
      )}

      <View className={`space-y-6 ${editing ? 'z-20 relative' : ''}`}>
        <Text className="text-white text-2xl font-bold mb-1">Perfil de Usuario</Text>

        {editing ? (
          <ProfileForm
            fullName={fullName}
            email={email}
            password={password}
            setFullName={setFullName}
            setEmail={setEmail}
            setPassword={setPassword}
            onSave={handleSave}
          />
        ) : (
          <ProfileDisplay
            fullName={fullName}
            email={email}
            onEdit={() => setEditing(true)}
            onLogout={handleLogout}
          />
        )}
      </View>

      <SaveConfirmationModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  )
}
