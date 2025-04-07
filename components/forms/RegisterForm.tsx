import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, TextInput, Pressable, Text } from 'react-native';
import { registerSchema, RegisterDTO } from '@/dtos/register.dto';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { ApiException } from '@/apis/ReaderBackend/core/types';

export default function RegisterForm() {
  const { register: registerUser } = useAuthContext();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterDTO) => {
    try {
      await registerUser(  data.email, data.password );
      router.replace('/home');
    } catch (error) {
      if (error instanceof ApiException) {
        alert(error.message);
      } else {
        alert('Error desconocido');
      }
    }
  };

  return (
    <View className="px-6 gap-2">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            className="bg-secondary px-4 py-2 text-white rounded-xl"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Contraseña"
            className="bg-secondary px-4 py-2 text-white rounded-xl"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Confirmar contraseña"
            className="bg-secondary px-4 py-2 text-white rounded-xl"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirmPassword && (
        <Text className="text-red-500">{errors.confirmPassword.message}</Text>
      )}

      <Pressable
        className="bg-primary p-3 rounded-xl mt-4 items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-bold">Registrarse</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/login')} className="mt-4 items-center">
        <Text className="text-sm text-text underline">¿Ya tienes cuenta? Iniciar sesión</Text>
      </Pressable>
    </View>
  );
}
