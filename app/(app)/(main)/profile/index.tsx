// app/(app)/profile/index.tsx
import { View, ScrollView } from 'react-native'
import UserInfoSection from '@/components/profile/UserInfoSection'
import ReadingPreferencesSection from '@/components/profile/ReadingPreferencesSection'

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-background px-6 pt-16 pb-24">
      <UserInfoSection />
      <View className="h-[1px] bg-white/10 my-8" />
      <ReadingPreferencesSection />
    </ScrollView>
  )
}
