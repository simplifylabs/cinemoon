import AppText from '../../components/text/AppText';
import { Stack, Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import colors from 'tailwindcss/colors';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const routes = [state.routes[0], { key: 'finder' }, state.routes[1]];
  descriptors.finder = {
    key: 'finder',
    name: 'finder',
    options: {
      tabBarLabel: 'Finder',
      tabBarIcon: ({ color, size }: any) => (
        <MagnifyingGlassIcon color={color} size={size} />
      ),
    },
  };

  return (
    <View className="bg-background">
      <View className="flex flex-row w-[85%] h-14 mx-auto my-5 bg-gray-800 rounded-full">
        {routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];

          if (index === 2) {
            index = 1;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            if (route.key === 'finder') {
              // push finder
              navigation.push('finder');
              return;
            }
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
              style={{ flex: route.key === 'finder' ? 1 : 2 }}
              key={route.key}
            >
              {route.key === 'finder' ? (
                <View className="relative flex flex-row items-center justify-center h-full">
                  <View className="absolute w-14 h-14 translate-x-[-28px] -top-3 bg-blue-500 rounded-full left-1/2 flex flex-row items-center justify-center">
                    {options.tabBarIcon({
                      color: '#fff',
                      size: 24,
                    })}
                  </View>
                </View>
              ) : (
                <View className="flex flex-row items-center justify-center h-full">
                  {options.tabBarIcon({
                    color: isFocused ? colors.blue['500'] : colors.gray['400'],
                    size: 24,
                  })}
                </View>
              )}
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
          href: '/home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: '/profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
