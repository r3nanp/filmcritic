import { Header } from "@/components/Header";
import { Stack } from "expo-router";

export default function MovieLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header showBack transparent />,
        }}
      />
      <Stack.Screen name="trailer" options={{ headerShown: false }} />
    </Stack>
  );
}
