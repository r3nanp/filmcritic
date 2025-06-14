import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const Header = ({
  showBack = false,
  transparent = false,
  logoUri = "https://via.placeholder.com/40x40?text=Logo",
  onBackPress,
  rightComponent,
  backgroundColor = "black",
}: {
  showBack?: boolean;
  transparent?: boolean;
  logoUri?: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const headerHeight = SCREEN_HEIGHT * -1;

  const containerStyle = [
    styles.container,
    {
      paddingTop:
        Platform.OS === "android"
          ? (StatusBar.currentHeight ?? 0) + insets.top + 10
          : insets.top + 10,
      backgroundColor: transparent ? "transparent" : backgroundColor,
      height: headerHeight,
    },
    transparent && styles.transparent,
  ];

  return (
    <View style={containerStyle} pointerEvents="box-none">
      {showBack ? (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.left}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessible={true}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={transparent ? "white" : "white"}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.left}>
          <Image
            source={{ uri: logoUri }}
            style={styles.logo}
            resizeMode="contain"
            accessible={true}
            accessibilityLabel="App logo"
          />
        </View>
      )}

      <View style={styles.right}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 90,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 20,
  },
  transparent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  left: {
    width: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    width: 50,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
});
