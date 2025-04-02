import { Text, View } from "react-native";
import { verifyInstallation } from 'nativewind';
export default function Index() {
      // Ensure to call inside a component, not globally
      verifyInstallation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
