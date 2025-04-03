import { ApiException } from "@/api/ReaderBackend/core/types";
import { login, register } from "@/api/ReaderBackend/modules/Auth";
import BigCoverCard from "@/components/atoms/BigCoverCard";
import BottomDrawer from "@/components/atoms/BottomDrawer";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
export default function Index() {
  const [showParamsDrawer, setShowParamsDrawer] = useState(false);
  /*Funciones de utilidad */
  const toggleReaderParamDrawer = () => {
    setShowParamsDrawer(!showParamsDrawer);
  };

  const testlogin = async () => {
    try {
      const response = await login({
        email: "admin@jaity.com",
        password: "admin123",
      });
      console.log(response.message); // "Usuario registrado exitosamente" (suponiendo que así sea)
    
    } catch (error) {
      if (error instanceof ApiException) {
        console.log("Mensaje:", error.message);
        console.log("Código de error:", error.code);
        console.log("Ruta de error:", error.path);
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  useEffect(() => {
    testlogin();
  }, []);

  return (
    <View>
        <Text className="text-white">
            {" BASE URL = "}
            {process.env.EXPO_PUBLIC_API_URL} ✨
          </Text>
    </View>
  );
}
