import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { View, TextInput, Pressable, Text,Image } from "react-native";
import { loginSchema, LoginDTO } from "@/dtos/login.dto";
import { useRouter } from "expo-router";
import { ApiException } from "@/apis/ReaderBackend/core/types";
import { useAppStore } from "@/store/Slices";
import googleLogo from "@/assets/google.png"

export default function LoginForm() {
  const login = useAppStore((s) => s.login);
  const fetchUser = useAppStore((s) => s.fetchUser);
  const loginWithGoogle = useAppStore((s) => s.loginWithGoogle);


  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDTO) => {
    try {
      await login(data.email, data.password);
      await fetchUser();
      router.replace("/(main)/home/");
    } catch (error) {
      if (error instanceof ApiException) {
        alert(error.message);
      } else {
        alert("Error desconocido" + error);
      }
    }
  };

  const handleOauthLogin = async () => {
    try {
      await loginWithGoogle();
      await fetchUser();
      router.replace("/(main)/home/");
   } catch (error) {
     if (error instanceof ApiException) {
       alert(error.message);
     } else {
       alert("Error desconocido" + error);
     }
   }
 
  }

  return (
    <View className="px-12 gap-2">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            className="bg-secondary px-4 py-3 text-white rounded-xl"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500">{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Contraseña"
            className="bg-secondary px-4 py-3 text-white rounded-xl"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500">{errors.password.message}</Text>
      )}

      <Pressable
        onPress={(e) => {
          e.preventDefault?.(); // ← esto protege en web
          handleSubmit(onSubmit)();
        }}
        className="bg-primary p-3 rounded-xl mt-4 items-center"
      >
        <Text className="text-white font-bold">Iniciar Sesión</Text>
      </Pressable>

      <Pressable
  onPress={(e) => {
    e.preventDefault?.(); // ← protege en web
    handleOauthLogin();
  }}
  className="bg-white border border-gray-300 rounded-xl flex-row items-center justify-center p-3 mt-4"
>
  <Image
    source={googleLogo}
    style={{ width: 20, height: 20, marginRight: 8 }}
  />
  <Text className="text-gray-800 font-semibold">Continuar con Google</Text>
</Pressable>
      <Pressable
        onPress={() => router.push("/register")}
        className="mt-4 items-center"
      >
        <Text className="text-sm text-text underline">
          ¿No tienes cuenta? Registrarse
        </Text>
      </Pressable>
    </View>
  );
}
