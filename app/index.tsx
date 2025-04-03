import BigCoverCard from "@/components/atoms/BigCoverCard";
import BottomDrawer from "@/components/atoms/BottomDrawer";
import { useState } from "react";
import { Button, Text, View } from "react-native";
export default function Index() {
  const [showParamsDrawer, setShowParamsDrawer] = useState(false);
  /*Funciones de utilidad */
  const toggleReaderParamDrawer = () => {
    setShowParamsDrawer(!showParamsDrawer);
  };

  return (
    <View>
      <Button onPress={toggleReaderParamDrawer} title="toggle"></Button>
    
      <BottomDrawer
        isVisible={showParamsDrawer}
        onClose={toggleReaderParamDrawer}
      >
        <View>
          <Text className="text-white">Hola desde el drawer ✨</Text>
        </View>
      </BottomDrawer>
    </View>
  );
}
