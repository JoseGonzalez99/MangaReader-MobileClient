import { View, TextInput, Pressable, Text } from 'react-native'

export default function ProfileForm({
  fullName, email, password,
  setFullName, setEmail, setPassword,
  onSave
}: any) {
  return (
    <View className="space-y-4">
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={onSave} className="bg-blue-600 py-3 rounded-xl mt-2">
        <Text className="text-white text-center font-semibold">Guardar cambios</Text>
      </Pressable>
    </View>
  )
}
