import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useRouter } from 'expo-router'
import logitochido from '@/assets/logo.png'
import AppLogo from '@/components/atoms/AppLogo'

const schemaLogin = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
})

const schemaRegister = schemaLogin.shape({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
})

const LoginScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegistering ? schemaRegister : schemaLogin),
  })

  const onSubmit = (data: any) => {
    if (isRegistering) {
      console.log('Registrarse con:', data)
    } else {
      console.log('Iniciar sesión con:', data)
    }
    reset()
  }

  const handleGoogleLogin = () => {
    console.log('Iniciar sesión con Google')
  }

  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <AppLogo imageUrl={logitochido} subText="JAITYMANGA" />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="w-full h-12 bg-secondary rounded-xl px-4 text-white text-base mb-1"
            placeholder="Ingresar Email"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text className="text-red-500 mb-2 text-sm">{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="w-full h-12 bg-secondary rounded-xl px-4 text-white text-base mb-1"
            placeholder="Ingresar Contraseña"
            placeholderTextColor="#ccc"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text className="text-red-500 mb-2 text-sm">{errors.password.message}</Text>}

      {isRegistering && (
        <>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="w-full h-12 bg-secondary rounded-xl px-4 text-white text-base mb-1"
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#ccc"
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 mb-2 text-sm">{errors.confirmPassword.message}</Text>
          )}
        </>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="w-full h-12 bg-primary rounded-xl justify-center items-center mb-4"
      >
        <Text className="text-white font-bold text-base">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </Text>
      </Pressable>

      <Pressable
        onPress={handleGoogleLogin}
        className="w-full h-12 bg-red-600 rounded-xl justify-center items-center mb-6"
      >
        <Text className="text-white font-bold text-base">Iniciar con Google</Text>
      </Pressable>

      <Pressable onPress={() => setIsRegistering(!isRegistering)}>
        <Text className="text-text text-sm underline">
          {isRegistering
            ? '¿Ya tienes una cuenta? Iniciar sesión'
            : '¿No tienes cuenta? Registrarse'}
        </Text>
      </Pressable>
    </View>
  )
}

export default LoginScreen
