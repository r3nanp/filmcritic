import { Stack } from "expo-router";

export default function TrailerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ presentation: "modal" }} />
    </Stack>
  );
}
