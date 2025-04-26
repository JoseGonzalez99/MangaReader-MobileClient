// app/(app)/profile/index.tsx
import { ScrollView, View } from "react-native";
import UserInfoSection from "@/components/profile/UserInfoSection";
import ContactSection from "@/components/profile/ContactSection";

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-between bg-background px-6 pt-16 pb-28">
      <UserInfoSection />
      <ContactSection />
    </View>
  );
}
