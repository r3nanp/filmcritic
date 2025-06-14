import { Colors } from "@/constants/Colors";
import type { TmdbMovie } from "@/lib/types";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
import { MovieItem } from "./MovieItem";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/**
 * This component is used to display a list of movies in a horizontal carousel, like Netflix.
 */
export function MovieList({
  title,
  movies,
  isLoading,
}: {
  title: string;
  movies: TmdbMovie[];
  isLoading: boolean;
}) {
  const keyExtractor = useCallback((item: TmdbMovie) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: TmdbMovie; index: number }) => {
      return <MovieItem movie={item} index={index} />;
    },
    []
  );

  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={SCREEN_WIDTH * 0.4 + 16}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "semibold",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  carousel: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  loader: {
    marginTop: 40,
  },
});
