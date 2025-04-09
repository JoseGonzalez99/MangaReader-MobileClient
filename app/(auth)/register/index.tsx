import AppLogo from '@/components/atoms/AppLogo';
import RegisterForm from '@/components/forms/RegisterForm';
import { View } from 'react-native';
import logo from "@/assets/logo.png";

export default function RegisterScreen() {
  return (
    <View className="flex-1 bg-background">
    <AppLogo imageUrl={logo} subText="JAITYMANGA"></AppLogo>
    <RegisterForm />
  </View>
  )

 
}
