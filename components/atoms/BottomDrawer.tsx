import React, { useEffect, useState, useCallback } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  title:string;
  children: React.ReactNode;
  scrollable?: boolean;
}

const BottomDrawer = ({
  isVisible,
  onClose,
  children,
  scrollable = true,
  title
}: BottomDrawerProps) => {
  const [visible, setVisible] = useState(isVisible);
  const slideAnim = useState(new Animated.Value(SCREEN_HEIGHT))[0];

  const animateDrawer = useCallback(
    (toValue: number, onEnd?: () => void) => {
      Animated.timing(slideAnim, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }).start(() => onEnd?.());
    },
    [slideAnim]
  );

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      animateDrawer(0);
    } else {
      animateDrawer(SCREEN_HEIGHT, () => setVisible(false));
    }
  }, [isVisible, animateDrawer]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50" />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          maxHeight: SCREEN_HEIGHT * 0.55, // 👈 Máximo 85% de la pantalla
        }}
        className="absolute bottom-0 left-0 right-0 bg-secondary rounded-t-2xl px-5 pt-4 pb-6"
      >
        {/* Handle visual */}
        <View className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-3" />
		<Text className="text-2xl text-center text-white font-bold mb-4">{title}</Text>
		
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {children}
          </ScrollView>
        ) : (
			
				<View>{children}</View>
			
         
        )}
      </Animated.View>
    </Modal>
  );
};

export default BottomDrawer;
