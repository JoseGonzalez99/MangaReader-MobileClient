import { ImageBackground, Text, View } from "react-native";

interface SmallCoverCardProps {
  title: string;
  image: string;
}

const SmallCoverCard = ({ title, image }: SmallCoverCardProps) => {
  return (
    <View>
      <ImageBackground
        source={{ uri: image }}
        className="h-[200px] w-[130px] rounded-2xl overflow-hidden justify-end shadow-md"
        imageStyle={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        resizeMode="cover"
      >
    <View className=" px-2 py-1 bg-black/60 ">
        <Text className=" text-white text-center text-sm font-semibold">
          {title}
        </Text>
      </View>

	  </ImageBackground>
  
    </View>
  );
};

export default SmallCoverCard;
