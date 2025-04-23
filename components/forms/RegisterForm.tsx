import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { View, TextInput, Pressable, Text, ScrollView, Image } from 'react-native';
import { registerSchema, RegisterDTO } from '@/dtos/register.dto';
import { useRouter } from 'expo-router';
import { ApiException } from '@/apis/ReaderBackend/core/types';
import { useAppStore } from '@/store/Slices';
import { useState } from 'react';

const avatarOptions = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPNWn6F9vTmb13dmy3Qbzdh9om-Nr5juSDdIlzTjrHcS9Qrr4AZW1K4YVZbUdEwPAnBE&usqp=CAU",
  "https://yt3.googleusercontent.com/B-nNYh2lzzYHUqOa7sxSqhR03wsJWVKM6pyMDW5aBSbouhWK4J-gPjjGBRpuQ13rfkXuIyB_XQ=s900-c-k-c0x00ffffff-no-rj",
  "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
];

export default function RegisterForm() {
  const register = useAppStore((s) => s.register);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<RegisterDTO>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      photoUrl: ''
    }
  });

  const selectedPhoto = watch("photoUrl");

  const onSubmit = async (data: RegisterDTO) => {
    try {
      await register(
        {email:data.email,password: data.password,fullName: data.fullName,photoUrl: data.photoUrl});
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
      {/* fullName */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nombre completo"
            className="bg-secondary px-4 py-2 text-white rounded-xl"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.fullName && <Text className="text-red-500">{errors.fullName.message}</Text>}

      {/* Avatares */}
      <Text className="text-white mt-2 mb-1">Selecciona tu avatar:</Text>
      <ScrollView horizontal className="space-x-4 mb-2" showsHorizontalScrollIndicator={false}>
        {avatarOptions.map((url) => (
          <Pressable
            key={url}
            onPress={() => setValue("photoUrl", url)}
            className={`p-1 rounded-full border-2 ${selectedPhoto === url ? 'border-blue-500' : 'border-transparent'}`}
          >
            <Image source={{ uri: url }} className="w-16 h-16 rounded-full" />
          </Pressable>
        ))}
      </ScrollView>
      {errors.photoUrl && <Text className="text-red-500">{errors.photoUrl.message}</Text>}

      {/* Email */}
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

      {/* Password */}
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

      {/* Confirmar Password */}
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
