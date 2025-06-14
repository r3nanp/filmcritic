import { TmdbMovie } from "@/lib/types";
import { resolveTmdbImage } from "@/utils/resolve-tmdb-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.4;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

/**
 * This component is used to display a movie item in a horizontal carousel, like Netflix.
 */
export function MovieItem({
  movie,
  index,
}: {
  movie: TmdbMovie;
  index: number;
}) {
  const router = useRouter();
  const anim = useSharedValue(0);

  useEffect(() => {
    anim.value = withDelay(
      index * 100,
      withTiming(1, {
        duration: 500,
      })
    );
  }, [anim, index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: anim.value,
      transform: [{ scale: anim.value * 0.1 + 0.9 }],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          marginRight: 16,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          router.push(`/(movie)/${movie.id}`);
        }}
        style={styles.card}
      >
        <Image
          source={{ uri: resolveTmdbImage(movie.poster_path) }}
          style={styles.image}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
