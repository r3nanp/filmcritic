import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import { useMovie } from "@/hooks/use-movie";
import type { TmdbMovie } from "@/lib/types";
import { resolveTmdbImage } from "@/utils/resolve-tmdb-image";
import { toDate } from "@/utils/to-date";
import { toMovieDuration } from "@/utils/to-movie-duration";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MovieBanner = ({ movieDetails }: { movieDetails: TmdbMovie }) => {
  const bannerImage = useMemo(
    () =>
      resolveTmdbImage(
        movieDetails?.backdrop_path || movieDetails?.poster_path
      ),
    [movieDetails]
  );

  return (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay} />
      <Text style={styles.bannerTitle} numberOfLines={2}>
        {movieDetails?.title}
      </Text>
    </View>
  );
};

const MovieInfoRow = ({ movieDetails }: { movieDetails: TmdbMovie }) => (
  <View style={styles.infoRow}>
    <Text style={styles.releaseDate}>
      {movieDetails?.release_date
        ? `Lançado em: ${toDate(movieDetails?.release_date)}`
        : "N/A"}
    </Text>
    <Text style={styles.releaseDate}>
      {`Duração: ${toMovieDuration(movieDetails?.runtime)}` || "N/A"}
    </Text>
  </View>
);

const RelatedMovies = ({
  movies,
  onMoviePress,
}: {
  movies: TmdbMovie[];
  onMoviePress: (movieId: number) => void;
}) => {
  if (movies.length === 0) return null;

  return (
    <>
      <Text style={styles.relatedTitle}>Filmes relacionados</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            style={styles.relatedMovieCard}
            onPress={() => onMoviePress(movie.id)}
          >
            <Image
              source={{ uri: resolveTmdbImage(movie.poster_path) }}
              style={styles.relatedImage}
            />
            <Text style={styles.relatedText} numberOfLines={1}>
              {movie.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { movieDetails, relatedMovies, isLoading } = useMovie(id as string);

  const opacity = useSharedValue(0);
  const translateYAnim = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateYAnim.value = withTiming(0, { duration: 500 });
  }, [opacity, translateYAnim]);

  const hasTrailer = useMemo(
    () => Boolean(movieDetails?.trailerUrl),
    [movieDetails]
  );

  if (isLoading || !movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <MovieBanner movieDetails={movieDetails} />

      <Animated.View
        style={[
          styles.detailsContainer,
          {
            opacity,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <MovieInfoRow movieDetails={movieDetails} />

        <View style={styles.actionList}>
          <View style={styles.myList}>
            {hasTrailer && (
              <TouchableOpacity style={styles.trailerButton} onPress={() => {}}>
                <Text style={styles.trailerButtonText}>Ver trailer</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.rating}>
            Avaliação: {movieDetails?.vote_average?.toFixed(2) || "N/A"}
          </Text>
        </View>

        <Text style={styles.overview}>
          {movieDetails?.overview || "Sem descrição disponível"}
        </Text>

        <RelatedMovies
          movies={relatedMovies?.results || []}
          onMoviePress={(movieId) => {
            router.push(`/(movie)/${movieId}`);
          }}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 64,
  },
  bannerContainer: {
    position: "relative",
    width: "100%",
    height: SCREEN_HEIGHT * 0.4,
    justifyContent: "flex-end",
    paddingBottom: 32,
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  bannerTitle: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    top: 20,
    fontFamily: "semibold",
    fontWeight: "semibold",
  },
  detailsContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  releaseDate: {
    color: "#fff",
    fontSize: 14,
    marginRight: 18,
    fontFamily: "sans",
  },
  actionList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  myList: {
    flexDirection: "row",
    alignItems: "center",
  },
  trailerButton: {
    marginTop: 16,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  trailerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
    fontFamily: "semibold",
  },
  rating: {
    color: "#fff",
    fontSize: 14,
    marginRight: 18,
    fontFamily: "sans",
  },
  overview: {
    fontSize: 16,
    color: "#eee",
    lineHeight: 22,
  },
  relatedTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "semibold",
    fontFamily: "semibold",
    marginVertical: 12,
  },
  relatedMovieCard: {
    width: 100,
    marginRight: 12,
  },
  relatedImage: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginBottom: 4,
  },
  relatedText: {
    color: "#fff",
    fontSize: 12,
  },
});
