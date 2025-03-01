import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from '@gorhom/bottom-sheet/lib/typescript/contexts';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          animation: 'none',
          headerShown: false,
          headerStyle: { backgroundColor: 'black' }
        }}
      >
        {/* get started */}
        <Stack.Screen name='index' />

        {/* boarding screens */}
        <Stack.Screen name='onboarding_first' options={{ animation: "none" }} />
        <Stack.Screen name='onboarding_second' options={{ animation: "slide_from_right" }} />
        <Stack.Screen name='onboarding_third' options={{ animation: "slide_from_right" }} />

        {/* login screens */}
        <Stack.Screen name='login' options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='forgetPassword' options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='forgetPasswordCode' />
        <Stack.Screen name='resetPassword' />

        {/* signup screen */}
        <Stack.Screen name='signup' options={{ animation: "fade_from_bottom" }} />
        <Stack.Screen name='verifyEmail' options={{ animation: "fade_from_bottom" }} />


        {/* create post */}
        <Stack.Screen name='createPost' options={{ headerShown: true, headerTitleAlign: "center", title: "Create Post" }} />

        {/* transaction history */}
        <Stack.Screen name="transitionHistory" options={{ headerShown: true, headerTitleAlign: "center", title: "Transaction History" }} />
        
        {/* notifcation */}
        <Stack.Screen name="notification" options={{ headerShown: true, headerTitleAlign: "center", title: "Notification" }} />
        
        {/* help center */}
        <Stack.Screen name="help" options={{ headerShown: true, headerTitleAlign: "center", title: "Help" }} />
        

        {/* Subscription */}
        <Stack.Screen name="subscription" options={{ headerShown: true, headerTitleAlign: "center", title: "Help" }} />

        {/* edit */}
        <Stack.Screen name="edit" options={{ headerShown: true, headerTitleAlign: "center", title: "Help" }} />

        {/* create tip */}
        <Stack.Screen name="createTipForm" />

        {/* createtip */}
        <Stack.Screen name="createtip" options={{ headerShown: true, headerTitleAlign: "center", title: "Create Tip" }} />
        
        {/* createtip */}
        <Stack.Screen name="profile" />

        {/* tabs and not found */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
