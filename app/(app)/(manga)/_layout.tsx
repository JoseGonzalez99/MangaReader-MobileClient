import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function MangaLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        header: () => (
          <LinearGradient
            colors={["#171717", "transparent"]}
            style={{
              paddingTop: 46,
              paddingHorizontal: 16,
              paddingBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={35} color="white" />
            </TouchableOpacity>
            {/*
               <TouchableOpacity onPress={() => console.log("Compartir")}>
              <Entypo name="share" size={30} color="white" />
            </TouchableOpacity>
            */}
         
          </LinearGradient>
        ),
        headerTransparent: true, // 👈 Asegura que el header sea "flotante"
      }}
    />
  );
}
