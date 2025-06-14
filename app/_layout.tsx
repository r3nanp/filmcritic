import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Header } from "@/components/Header";
import { queryClient } from "@/lib/query-client";

export default function RootLayout() {
  const [loaded] = useFonts({
    sans: Inter_400Regular,
    semibold: Inter_600SemiBold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ header: () => <Header /> }} />
          <Stack.Screen name="(movie)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
