import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { MovieList } from "@/components/MovieList";
import { Colors } from "@/constants/Colors";
import { useHome } from "@/hooks/use-home";
import { useSearchMovie } from "@/hooks/use-search-movie";

export default function HomeScreen() {
  const { fetchHome, isLoading, movies, popular, trending, upcoming } =
    useHome();
  const { searchQuery, searchResults, searchStatus, setSearchQuery } =
    useSearchMovie();

  const fadeAnim = useSharedValue(0);
  const searchBarAnim = useSharedValue(0);

  const startAnimations = useCallback(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
  }, [fadeAnim]);

  const animateSearchBar = (focused: boolean) => {
    searchBarAnim.value = withTiming(focused ? 1 : 0, { duration: 200 });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchFocus = () => {
    animateSearchBar(true);
  };

  const handleSearchBlur = () => {
    animateSearchBar(false);
  };

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  useEffect(() => {
    startAnimations();
  }, [startAnimations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const searchContainerStyle = useAnimatedStyle(() => ({
    borderColor: searchBarAnim.value === 1 ? Colors.primary : Colors.searchBar,
    backgroundColor:
      searchBarAnim.value === 1 ? Colors.searchBarFocused : Colors.searchBar,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/film-critic.png")}
          alt="logo"
          style={styles.logo}
        />
      </Animated.View>

      <Animated.View style={[styles.searchContainer, searchContainerStyle]}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={
              searchStatus === "success" ? Colors.primary : Colors.placeholder
            }
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar filmes..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            returnKeyType="search"
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              style={styles.clearButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}

          <MaterialIcons name="search" size={20} color="white" />
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Animated.View style={fadeStyle}>
          {searchStatus === "pending" && searchQuery.length > 0 ? (
            <MovieList
              isLoading
              movies={searchResults}
              title={`🔍 Resultados para "${searchQuery}"`}
            />
          ) : (
            <>
              {trending.length > 0 && (
                <MovieList
                  isLoading={isLoading}
                  movies={trending}
                  title={"🔥 Trending Agora"}
                />
              )}
              <MovieList
                isLoading={isLoading}
                movies={popular}
                title={"📈 Em Alta"}
              />
              <MovieList
                isLoading={isLoading}
                movies={movies}
                title={"⭐ Melhores Avaliados"}
              />
              {upcoming.length > 0 && (
                <MovieList
                  isLoading={isLoading}
                  movies={upcoming}
                  title={"🎬 Em Breve"}
                />
              )}
            </>
          )}
        </Animated.View>
        <View style={styles.footerSpacer} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  logo: {
    width: 200,
    height: 60,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "hidden",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#e50914",
    padding: 8,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  footerSpacer: {
    height: 50,
  },
});
