import AppLogo from "@/components/atoms/AppLogo";
import LoginForm from "@/components/forms/LoginForm";
import { View, Text } from "react-native";
import logo from "@/assets/logo.png";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-background">
      <AppLogo imageUrl={logo} subText="JAITYMANGA"></AppLogo>
      <LoginForm/>
    </View>
  );
}
