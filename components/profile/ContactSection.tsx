import { View, Text, Linking, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ContactSection() {
  const handleEmailPress = ( email:string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View className="bg-neutral-900 p-6 rounded-2xl  shadow-sm">
      <Text className="text-white text-center text-lg font-bold mb-4">
        Contacto
      </Text>


      <Pressable
        onPress={()=>handleEmailPress("hotboxmangareader@gmail.com")}
        className="flex-row items-center justify-center mb-6"
      >
        <FontAwesome name="envelope" size={20} color="white" />
        <Text className="text-primary ml-2 underline">
          hotboxmangareader@gmail.com
        </Text>
      </Pressable>

      <Pressable
        onPress={()=>handleEmailPress(" jose.elias.gv99@gmail.com")}
        className="flex-row items-center justify-center mb-6"
      >
        <FontAwesome name="envelope" size={20} color="white" />
        <Text className="text-primary ml-2 underline">
          jose.elias.gv99@gmail.com
        </Text>
      </Pressable>

      <View className="flex-row justify-center mb-6">
        <Pressable className='pr-6' onPress={() => openLink('https://github.com/JoseGonzalez99')}>
          <FontAwesome name="github" size={24} color="white" />
        </Pressable>

        <Pressable  className='pr-6' onPress={() => openLink('www.linkedin.com/in/josegonzalez99')}>
          <FontAwesome name="linkedin" size={24} color="white" />
        </Pressable>
{/*
       <Pressable onPress={() => openLink('https://instagram.com/')}>
          <FontAwesome name="instagram" size={24} color="white" />
        </Pressable> */}
 
      </View>

      <Text className="text-gray-400 text-center text-sm">
        Desarrollado por José González - HotBox Software Factory
      </Text>
    </View>
  );
}
