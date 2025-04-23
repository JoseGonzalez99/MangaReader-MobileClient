import {
  View,
  TextInput,
  Pressable,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { AppUser } from "@/dtos/mangareader.dto";
import { UpdateProfileRequest } from "@/apis/ReaderBackend/modules/User";
import { useAppStore } from "@/store/Slices";

const avatarOptions = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPNWn6F9vTmb13dmy3Qbzdh9om-Nr5juSDdIlzTjrHcS9Qrr4AZW1K4YVZbUdEwPAnBE&usqp=CAU",
  "https://yt3.googleusercontent.com/B-nNYh2lzzYHUqOa7sxSqhR03wsJWVKM6pyMDW5aBSbouhWK4J-gPjjGBRpuQ13rfkXuIyB_XQ=s900-c-k-c0x00ffffff-no-rj",
  "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
];

type ProfileFormProps = {
  user: AppUser;
  setEditing: (val: boolean) => void;
};

export default function ProfileForm({ user, setEditing }: ProfileFormProps) {
  const [fullName, setFullName] = useState(user.fullName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const fetchUser = useAppStore((s) => s.fetchUser);
  const updateUser = useAppStore((s) => s.updateUser);

  const isfirebase = user.provider === "firebase";

  const handleSave = async () => {
    try {
      setLoading(true);

      const updatedUser: UpdateProfileRequest = {
        fullName,
        photoUrl,
        email: isfirebase ? user.email : email,
      };

      await updateUser(updatedUser);
      await fetchUser();

      Alert.alert("Éxito", "Perfil actualizado correctamente.");
      setEditing(false);
    } catch (err) {
      Alert.alert("Error", "Hubo un problema al actualizar tu perfil.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="space-y-5">
      <TextInput
        className="bg-zinc-800 text-white rounded px-4 py-3"
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Selector de avatar */}
      <View>
        <Text className="text-white mb-2">Selecciona un avatar</Text>
        <ScrollView
          horizontal
          className="space-x-4"
          showsHorizontalScrollIndicator={false}
        >
          {avatarOptions.map((url) => (
            <Pressable
              key={url}
              onPress={() => setPhotoUrl(url)}
              className={`p-1 rounded-full border-2 ${
                photoUrl === url ? "border-blue-500" : "border-transparent"
              }`}
            >
              <Image source={{ uri: url }} className="w-16 h-16 rounded-full" />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Campos condicionales */}
      {!isfirebase && (
        <>
          <TextInput
            className="bg-zinc-800 text-white rounded px-4 py-3"
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </>
      )}

      <Pressable
        onPress={handleSave}
        disabled={loading}
        className={`py-3 rounded-xl mt-2 ${
          loading ? "bg-zinc-600" : "bg-blue-600"
        }`}
      >
        <Text className="text-white text-center font-semibold">
          {loading ? "Guardando..." : "Guardar cambios"}
        </Text>
      </Pressable>
    </View>
  );
}
