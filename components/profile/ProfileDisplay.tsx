import { View, Text, Pressable, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { AppUser } from "@/dtos/mangareader.dto";

export default function ProfileDisplay({
  user,
  onEdit,
  onReset,
  onLogout,
}: {
  user: AppUser;
  onEdit: () => void;
  onReset: () => void;
  onLogout: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const isfirebase = user.provider === "firebase";

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="items-center space-y-5"
    >
      {user.photoUrl ? (
        <Image
          source={{ uri: user.photoUrl }}
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
      ) : (
        <View className="w-24 h-24 rounded-full bg-zinc-700 items-center justify-center border-2 border-zinc-600">
          <FontAwesome name="user" size={32} color="#ccc" />
        </View>
      )}

      <View className="items-center">
        <Text className="text-white text-xl font-bold flex-row items-center">
          <MaterialIcons name="person" size={20} color="#60a5fa" />{" "}
          {user.fullName}
        </Text>
        <Text className="text-white text-lg flex-row items-center mt-1">
          <MaterialIcons name="email" size={18} color="#60a5fa" /> {user.email}
        </Text>
      </View>

      <View className="flex-col items-center  mt-4">
        <Pressable
          onPress={onEdit}
          className="bg-blue-600 py-2 px-4 mb-4 rounded-lg flex-row items-center"
        >
          <MaterialIcons name="edit" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">
            Actualizar informacion
          </Text>
        </Pressable>

        {!isfirebase && (
          <Pressable
            onPress={onReset}
            className="bg-green-700 py-2 px-4 mb-4 rounded-lg flex-row items-center"
          >
            <MaterialIcons name="password" size={18} color="white" />
            <Text className="text-white font-semibold ml-2">
              Cambiar de contresaña
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={onLogout}
          className="bg-red-600 py-2 px-4 rounded-lg flex-row items-center"
        >
          <MaterialIcons name="logout" size={18} color="white" />
          <Text className="text-white font-semibold ml-2">Cerrar sesion</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
