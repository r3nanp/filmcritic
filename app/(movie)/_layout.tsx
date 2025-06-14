import { Header } from "@/components/Header";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          header: () => <Header showBack transparent />,
        }}
      />
    </Stack>
  );
}
