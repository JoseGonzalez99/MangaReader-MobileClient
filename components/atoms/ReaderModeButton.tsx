import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ReaderModeButtonProps {
  title: string;
  icon: any;
  active: boolean;
  handlePress: () => void;
}

const ReaderModeButton = ({
  title,
  icon,
  active,
  handlePress,
}: ReaderModeButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const iconColor = active ? '#ffffff' : '#9ca3af';

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`w-[60px] h-[60px] justify-center items-center rounded-lg m-2 ${
        active
          ? 'bg-primary'
          : 'bg-secondary border-2 border-primary'
      } ${pressed ? 'scale-95' : 'scale-100'} transition-all duration-150`}
    >
      <FontAwesome name={icon} size={22} color={iconColor} />
      <Text className="text-[12px] text-white mt-1">{title}</Text>
    </Pressable>
  );
};

export default ReaderModeButton;
