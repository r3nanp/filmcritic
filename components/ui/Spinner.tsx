import { Colors } from "@/constants/Colors";
import { ActivityIndicator } from "react-native";

export function Spinner({
  size = "large",
  color = Colors.primary,
}: {
  size?: "small" | "large";
  color?: string;
}) {
  return <ActivityIndicator size={size} color={color} />;
}
