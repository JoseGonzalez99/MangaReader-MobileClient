import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/fontSize';

export default function MainTabsLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarInactiveTintColor: colors.white,
      tabBarActiveTintColor: colors.white,
      tabBarLabelStyle: {
        fontSize: fontSize.xs,
        fontWeight: '500',
      },
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        backgroundColor: colors.primary,

        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        borderTopWidth: 0,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 15,
        marginHorizontal: 20,
        height: 60,
      },
    }}
    >
      <Tabs.Screen name="home" options={{ title: 'Inicio',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" size={35} color={color}></FontAwesome>
        )
       }} />
      <Tabs.Screen name="library" options={{ title: 'Biblioteca',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="book" size={35} color={color}></FontAwesome>
        )
       }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="user" size={35} color={color}></FontAwesome>
        )
       }} />
    </Tabs>
  );
}
