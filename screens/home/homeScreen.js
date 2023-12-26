import React from "react";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel-v4";
import * as Progress from "react-native-progress";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_API_ENDPOINT = "https://api.themoviedb.org/3";

const bannersList = [
  {
    image: require("../../assets/images/banners/banner1.png"),
  },
  {
    image: require("../../assets/images/banners/banner2.png"),
  },
  {
    image: require("../../assets/images/banners/banner3.png"),
  },
  {
    image: require("../../assets/images/banners/banner4.png"),
  },
  {
    image: require("../../assets/images/banners/banner5.png"),
  },
];

const categoriesList = [
  {
    id: "1",
    categoryImage: require("../../assets/images/category/action.png"),
    category: "Action",
  },
  {
    id: "2",
    categoryImage: require("../../assets/images/category/adventure.png"),
    category: "Adventure",
  },
  {
    id: "3",
    categoryImage: require("../../assets/images/category/comedy.png"),
    category: "Comedy",
  },
  {
    id: "4",
    categoryImage: require("../../assets/images/category/drama.png"),
    category: "Drama",
  },
  {
    id: "5",
    categoryImage: require("../../assets/images/category/horror.png"),
    category: "Horror",
  },
  {
    id: "6",
    categoryImage: require("../../assets/images/category/history.png"),
    category: "History",
  },
  {
    id: "7",
    categoryImage: require("../../assets/images/category/love.png"),
    category: "Love",
  },
];

const continueWatchingList = [
  {
    id: "1",
    watchingImage: require("../../assets/images/continueWatching/continueWatching1.png"),
    watchingPercentage: 35,
  },
  {
    id: "2",
    watchingImage: require("../../assets/images/continueWatching/continueWatching2.png"),
    watchingPercentage: 80,
  },
  {
    id: "3",
    watchingImage: require("../../assets/images/continueWatching/continueWatching3.png"),
    watchingPercentage: 20,
  },
  {
    id: "4",
    watchingImage: require("../../assets/images/continueWatching/continueWatching4.png"),
    watchingPercentage: 70,
  },
  {
    id: "5",
    watchingImage: require("../../assets/images/continueWatching/continueWatching5.png"),
    watchingPercentage: 60,
  },
];

const popularWebSeriesList = [
  {
    id: "1",
    webSeriesImage: require("../../assets/images/popularWebSeries/series1.png"),
  },
  {
    id: "2",
    webSeriesImage: require("../../assets/images/popularWebSeries/series2.png"),
  },
  {
    id: "3",
    webSeriesImage: require("../../assets/images/popularWebSeries/series3.png"),
  },
  {
    id: "4",
    webSeriesImage: require("../../assets/images/popularWebSeries/series4.png"),
  },
  {
    id: "5",
    webSeriesImage: require("../../assets/images/popularWebSeries/series5.png"),
  },
];

const popularMoviesList = [
  {
    id: "1",
    movieImage: require("../../assets/images/popularMovies/movie1.png"),
  },
  {
    id: "2",
    movieImage: require("../../assets/images/popularMovies/movie2.png"),
  },
  {
    id: "3",
    movieImage: require("../../assets/images/popularMovies/movie3.png"),
  },
  {
    id: "4",
    movieImage: require("../../assets/images/popularMovies/movie4.png"),
  },
  {
    id: "5",
    movieImage: require("../../assets/images/popularMovies/movie5.png"),
  },
];

const trendingList = [
  {
    id: "1",
    image: require("../../assets/images/continueWatching/continueWatching2.png"),
  },
  {
    id: "2",
    image: require("../../assets/images/continueWatching/continueWatching3.png"),
  },
  {
    id: "3",
    image: require("../../assets/images/continueWatching/continueWatching4.png"),
  },
  {
    id: "4",
    image: require("../../assets/images/continueWatching/continueWatching5.png"),
  },
  {
    id: "5",
    image: require("../../assets/images/continueWatching/movie1.png"),
  },
];

const { width, height } = Dimensions.get("window");

const itemWidth = Math.round(width * 0.65);

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <FlatList
          ListHeaderComponent={
            <>
              {banners()}
              {categoryInfo()}
              {continueWatchingInfo()}
              {popularWebSeriesInfo()}
              {popularMoviesInfo()}
              {trendingInfo()}
            </>
          }
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );

  function trendingInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.commonImageStyle}
        onPress={() => navigation.push("WebSeriesDetail")}
      >
        <Image
          source={item.image}
          style={styles.commonImageStyle}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <View style={styles.withViewAllTitleWrapStyle}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.whiteColor20SemiBold }}
          >
            Trending Now
          </Text>
          <Text
            onPress={() => navigation.push("PopularOnStreamit")}
            style={{ ...Fonts.primaryColor16SemiBold }}
          >
            View All
          </Text>
        </View>
        <FlatList
          data={trendingList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function popularMoviesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.commonImageStyle}
        onPress={() => navigation.push("MovieDetail")}
      >
        <Image
          source={item.movieImage}
          style={styles.commonImageStyle}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <View style={styles.withViewAllTitleWrapStyle}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.whiteColor20SemiBold }}
          >
            Popular Movies on Streamit
          </Text>
          <Text
            onPress={() => navigation.push("PopularOnStreamit")}
            style={{ ...Fonts.primaryColor16SemiBold }}
          >
            View All
          </Text>
        </View>
        <FlatList
          data={popularMoviesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function popularWebSeriesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.commonImageStyle}
        onPress={() => navigation.push("WebSeriesDetail")}
      >
        <Image
          source={item.webSeriesImage}
          style={styles.commonImageStyle}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <View style={styles.withViewAllTitleWrapStyle}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.whiteColor20SemiBold }}
          >
            Popular Web Series on Streamit
          </Text>
          <Text
            onPress={() => navigation.push("PopularOnStreamit")}
            style={{ ...Fonts.primaryColor16SemiBold }}
          >
            View All
          </Text>
        </View>
        <FlatList
          data={popularWebSeriesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function continueWatchingInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.watchingImageStyle}
        onPress={() => navigation.push("Episodes")}
      >
        <ImageBackground
          source={item.watchingImage}
          style={styles.watchingImageStyle}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <Progress.Bar
            progress={item.watchingPercentage / 100.0}
            width={null}
            color={Colors.primaryColor}
            borderWidth={0}
            unfilledColor={Colors.lightGrayColor}
            height={5}
            borderRadius={0}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          Continue Watching
        </Text>
        <FlatList
          data={continueWatchingList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function categoryInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("PopularOnStreamit")}
        style={styles.categoryInfoWrapStyle}
      >
        <ImageBackground
          source={item.categoryImage}
          style={{ flex: 1 }}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <View style={styles.categoryImageShadowStyle}>
            <Text style={{ ...Fonts.whiteColor18Medium }}>{item.category}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          Category
        </Text>
        <FlatList
          data={categoriesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
            paddingRight: Sizes.fixPadding,
          }}
        />
      </View>
    );
  }

  function banners() {
    const popularMoviesEndpointSufix = "/movie/popular?language=en-US&page=1";
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

    useEffect(() => {
      fetch(TMDB_API_ENDPOINT + popularMoviesEndpointSufix, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDUzN2ZiN2U0N2VlMDI2Y2VhMTMwN2NmZTc2MzkzOSIsInN1YiI6IjY1ODY0MGQ1NWFiYTMyNjc1OWI5MDQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz31XqIIjE5CSCUKl4v1eE21rgjz8j6xzbL9em2_Sxk",
          accept: "application/json",
        },
      })
        .then((response) => response.json()) // Convert the response to JSON
        .then((json) => {
          setNowPlayingMovies(json.results);
        }) // Update the state with the data
        .catch((error) => console.error(error)); // Handle any errors
    }, []);

    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("MovieDetail", { data: item })}
      >
        <Image
          source={{ uri: TMDB_IMAGE_URL + item.poster_path }}
          style={styles.bannerImageStyle}
          resizeMode="stretch"
        />
      </TouchableOpacity>
    );
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
        <Carousel
          key={nowPlayingMovies.length}
          data={nowPlayingMovies}
          sliderWidth={width}
          itemWidth={itemWidth}
          renderItem={renderItem}
          firstItem={2}
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <Text
          style={{
            letterSpacing: 3.0,
            flex: 1,
            ...Fonts.primaryColor30BebasRegular,
          }}
        >
          STREAMIT
        </Text>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={Colors.whiteColor}
          onPress={() => navigation.push("Notification")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.blackColor,
  },
  bannerImageStyle: {
    width: itemWidth,
    height: 400,
    borderRadius: Sizes.fixPadding,
  },
  categoryInfoWrapStyle: {
    width: width * 0.35,
    height: 80.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 5.0,
    marginRight: Sizes.fixPadding,
  },
  categoryImageShadowStyle: {
    flex: 1,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  watchingImageStyle: {
    width: width * 0.42,
    height: 100.0,
    justifyContent: "flex-end",
    marginRight: Sizes.fixPadding,
    overflow: "hidden",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  withViewAllTitleWrapStyle: {
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commonImageStyle: {
    width: width * 0.42,
    height: height * 0.16,
    borderRadius: Sizes.fixPadding - 5.0,
    marginRight: Sizes.fixPadding,
  },
});

export default HomeScreen;
