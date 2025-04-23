import { Modal, Pressable, Text, View } from 'react-native'

export default function SaveConfirmationModal({ visible, onClose }: {
  visible: boolean
  onClose: () => void
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        onPress={onClose}
        className="flex-1 justify-center items-center bg-black/60"
      >
        <View className="bg-zinc-900 rounded-xl w-4/5 p-6">
          <Text className="text-white text-lg font-bold mb-4">Cambios guardados</Text>
          <Text className="text-gray-300 mb-4">
            Tus datos han sido actualizados correctamente.
          </Text>
          <Pressable onPress={onClose} className="bg-blue-600 py-3 rounded-lg">
            <Text className="text-white text-center font-semibold">Entendido</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}
