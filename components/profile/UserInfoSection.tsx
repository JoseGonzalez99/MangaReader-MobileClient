import { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useAppStore } from "@/store/Slices";

import ProfileDisplay from "./ProfileDisplay";
import SaveConfirmationModal from "./SaveConfirmationModal";
import ProfileForm from "../forms/ProfileForm";
import { AppUser } from "@/dtos/mangareader.dto";
import ChangePasswordForm from "./ChangePassWordForm";

export default function UserInfoSection() {
  const router = useRouter();
  const user = useAppStore((s) => s.appUser);

  const [editing, setEditing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const clearUser = useAppStore((s) => s.clearUser);
  const logout = useAppStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
    clearUser();
    router.replace("/(auth)/login");
  };

  return (
    <View className="relative px-4 py-6">

      <View className={`space-y-6 ${editing ? "z-20 relative" : ""}`}>
        {editing ? (
          <ProfileForm user={user as AppUser} setEditing={setEditing} />
        ) : (
          <ProfileDisplay
          user={user as AppUser}
          
            onEdit={() => setEditing(true)}
            onReset={() => setPasswordModalVisible(true)}
            onLogout={handleLogout}
          />
        )}
      </View>

      <Modal
        visible={passwordModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70 px-6">
          <View className="bg-zinc-900 rounded-xl p-6 w-full max-w-md">
            <Text className="text-white text-lg font-bold mb-4">
              Cambiar contraseña
            </Text>
            <ChangePasswordForm
              onClose={() => setPasswordModalVisible(false)}
            />
            <Pressable
              onPress={() => setPasswordModalVisible(false)}
              className="mt-4 bg-zinc-700 py-2 rounded"
            >
              <Text className="text-center text-white">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <SaveConfirmationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
