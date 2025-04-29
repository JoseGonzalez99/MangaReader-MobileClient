import AppLogo from "@/components/atoms/AppLogo";
import LoginForm from "@/components/forms/LoginForm";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import logo from "@/assets/logo.png";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
    className="flex-1 bg-background"
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1  justify-center py-10 px-4">
          <AppLogo imageUrl={logo} subText="JMangaReader" />
          <LoginForm />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}
