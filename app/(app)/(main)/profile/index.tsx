// app/(app)/profile/index.tsx
import {  ScrollView } from 'react-native'
import UserInfoSection from '@/components/profile/UserInfoSection'

export default function ProfileScreen() {

  return (
    <ScrollView className="flex-1 bg-background px-6 pt-16 pb-24">
      <UserInfoSection />
    </ScrollView>
  )
}
