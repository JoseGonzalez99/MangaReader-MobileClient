import { useLocalSearchParams } from "expo-router";
import { View ,Text} from "react-native";

export default function ReaderScreen() {
      const { chapterId } = useLocalSearchParams();
    
    return (<View>
        <Text>ReaderScreen, reading {chapterId}</Text>
    </View>)
}

