import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { View, TextInput, Pressable, Text } from "react-native";
import { loginSchema, LoginDTO } from "@/dtos/login.dto";
import { useRouter } from "expo-router";
import { ApiException } from "@/apis/ReaderBackend/core/types";
import { useAppStore } from "@/store/Slices";

export default function LoginForm() {
  const login = useAppStore((s) => s.login);
  const fetchUser = useAppStore((s) => s.fetchUser);

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
       console.log("onSubmit Ejecutado")
      await login(data.email, data.password);
      console.log("login Ejecutado")
      await fetchUser();
      console.log("fetchUser Ejecutado")
      router.replace("/(main)/home/");
    } catch (error) {
      if (error instanceof ApiException) {
        alert(error.message);
      } else {
        alert("Error desconocido" + error);
      }
    }
  };

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
