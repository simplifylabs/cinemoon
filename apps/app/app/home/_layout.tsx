import AppText from '../../components/text/AppText';
import { Tabs } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { HomeIcon } from 'react-native-heroicons/solid';
import colors from 'tailwindcss/colors';

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View className="bg-background">
      <View className="flex flex-row w-[85%] h-16 mx-auto my-5 bg-gray-800 rounded-full">
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              {/* Render tab icon */}
              {options.tabBarIcon({
                color: isFocused ? colors.blue['500'] : colors.gray['400'],
                size: 24,
              })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={CustomTabBar}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: '/',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
