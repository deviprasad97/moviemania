import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Dimensions,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Snackbar } from "react-native-paper";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { URLS } from "../../constants/config";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import Carousel from "react-native-snap-carousel-v4";

const { width, height } = Dimensions.get("window");
const itemWidth = Math.round(width * 0.65);

const searchCategoryList = [
  "Comedy movies",
  "Mystery",
  "Cartoon Movie",
  "Bollywood",
  "Action",
  "History",
  "Thriller",
  "Horror",
  "Adventure",
];

const recentSearchesList = [
  "Money heist",
  "Funny Movies",
  "Last wish of Angela",
  "The Thundermans",
];

const movieCategoriesList = [
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

const suggestedMovieList = [
  {
    id: "1",
    movieImage: require("../../assets/images/popular/popular16.png"),
  },
  {
    id: "2",
    movieImage: require("../../assets/images/popular/popular10.png"),
  },
  {
    id: "3",
    movieImage: require("../../assets/images/popular/popular11.png"),
  },
  {
    id: "4",
    movieImage: require("../../assets/images/popular/popular13.png"),
  },
  {
    id: "5",
    movieImage: require("../../assets/images/popular/popular14.png"),
  },
  {
    id: "6",
    movieImage: require("../../assets/images/popular/popular15.png"),
  },
  {
    id: "7",
    movieImage: require("../../assets/images/popularMovies/movie6.png"),
  },
];

const SearchScreen = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchResultsViewEnabled, toggleSearchResultsView] = useState(false);
  const [selectedChipKey, setSelectedChipKey] = useState(0);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef(null);
  const chipsAnimation = useRef(new Animated.Value(0)).current;

  const [chipData, setChipData] = useState([
    { key: 0, label: "Movies" },
    { key: 1, label: "TV" },
    { key: 2, label: "Documentary" },
    { key: 3, label: "All" },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {searchInfo()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {!isSearchResultsViewEnabled && (
            <>
              {categoryInfo()}
              {recentSearchesInfo()}
              {movieCategoryInfo()}
              {suggestionInfo()}
            </>
          )}
          {isSearchResultsViewEnabled && (
            <>
              {
                <MovieWatchlist
                  data={searchResults}
                  navigation={navigation}
                ></MovieWatchlist>
              }
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function suggestionInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          ...styles.movieImageStyle,
          marginBottom: Sizes.fixPadding,
          marginRight: Sizes.fixPadding,
        }}
        onPress={() => navigation.push("MovieDetail")}
      >
        <Image source={item.movieImage} style={styles.movieImageStyle} />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
        <View style={styles.suggestionTitleWrapStyle}>
          <Text style={{ ...Fonts.whiteColor20SemiBold }}>
            Movies You May Like
          </Text>
          <Text
            onPress={() => navigation.push("PopularOnStreamit")}
            style={{ ...Fonts.primaryColor16SemiBold }}
          >
            View All
          </Text>
        </View>
        <FlatList
          data={suggestedMovieList}
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

  function movieCategoryInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.push("PopularOnStreamit")}
        style={styles.movieCategoryInfoWrapStyle}
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
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding,
        }}
      >
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
          listKey="movieCategories"
          data={movieCategoriesList}
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

  function recentSearchesInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.recentSearchTitleWrapStyle}>
          <Text style={{ ...Fonts.whiteColor20SemiBold }}>Recent Searches</Text>
          <Text style={{ ...Fonts.primaryColor16SemiBold }}>Clear All</Text>
        </View>
        {recentSearchesList.map((item, index) => (
          <View
            key={`${index}`}
            style={{
              marginBottom: Sizes.fixPadding,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="search"
              color={Colors.primaryColor}
              size={18}
            />
            <Text
              style={{
                marginLeft: Sizes.fixPadding,
                ...Fonts.whiteColor15Regular,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  function categoryInfo() {
    return (
      <View style={styles.categoryInfoWrapStyle}>
        {searchCategoryList.map((item, index) => (
          <View key={`${index}`} style={styles.searchCategoryWrapStyle}>
            <Text style={{ ...Fonts.whiteColor15Regular }}>{item}</Text>
          </View>
        ))}
      </View>
    );
  }

  function handleSearch() {
    // API call with searchQuery
    // For example: fetch(`https://api.example.com/search?query=${searchQuery}`)
    // Then handle the response and do something with it
    if (searchQuery === "") {
      toggleSearchResultsView(false);
    } else {
      toggleSearchResultsView(true);
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=true&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDUzN2ZiN2U0N2VlMDI2Y2VhMTMwN2NmZTc2MzkzOSIsInN1YiI6IjY1ODY0MGQ1NWFiYTMyNjc1OWI5MDQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz31XqIIjE5CSCUKl4v1eE21rgjz8j6xzbL9em2_Sxk",
            accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // Process and use the data
          setSearchResults(data.results);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }
  function handleOnChangeSearchText(text) {
    // if (text === "") {
    //   toggleSearchResultsView(false);
    // } else {
    //   toggleSearchResultsView(true);
    // }
    setSearchQuery(text);
  }

  function handleChipPress(chipKey, event) {
    event.preventDefault(); // Prevent default behavior
    setSelectedChipKey(chipKey);
    // Forcefully focus the TextInput if it's not already focused
    if (searchInputRef.current && !isSearchFocused) {
      searchInputRef.current.focus();
    }
  }

  function renderChip(chip) {
    const isSelected = chip.key === selectedChipKey;
    const chipStyle = isSelected ? styles.selectedChipStyle : styles.chipStyle;
    return (
      <TouchableOpacity
        key={chip.key}
        style={chipStyle}
        onPress={(event) => handleChipPress(chip.key, event)}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
      >
        <Text style={styles.chipTextStyle}>{chip.label}</Text>
      </TouchableOpacity>
    );
  }

  function searchInfo() {
    const animateSearchFocus = () => {
      Animated.timing(searchAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, // Change to true if not animating layout properties
      }).start();
    };

    const animateSearchBlur = () => {
      Animated.timing(searchAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false, // Change to true if not animating layout properties
      }).start();
    };
    const animateChipsIn = () => {
      Animated.timing(chipsAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    };

    const animateChipsOut = () => {
      Animated.timing(chipsAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    };
    const searchInputStyle = searchAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -50], // Adjust these values to control the animation
    });
    return (
      <Animated.View
        style={{
          backgroundColor: Colors.blackColor,
          padding: Sizes.fixPadding * 2.0,
          transform: [{ translateY: searchInputStyle }],
        }}
      >
        {!isSearchFocused && (
          <Animated.Text
            style={{
              ...Fonts.whiteColor22Bold,
              opacity: searchAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            Search
          </Animated.Text>
        )}
        <View style={styles.searchFieldWrapStyle}>
          <MaterialIcons name="search" color={Colors.primaryColor} size={22} />
          <TextInput
            placeholder="Search Tv shows, Movies & Series..."
            placeholderTextColor={Colors.grayColor}
            ref={searchInputRef}
            style={{
              height: 20.0,
              ...Fonts.grayColor15Regular,
              flex: 1,
              marginLeft: Sizes.fixPadding,
            }}
            selectionColor={Colors.primaryColor}
            onChangeText={(text) => {
              handleOnChangeSearchText(text);
            }}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            value={searchQuery}
            onFocus={() => {
              setIsSearchFocused(true);
              toggleSearchResultsView(true);
              animateSearchFocus();
              animateChipsIn();
            }}
            onBlur={() => {
              setIsSearchFocused(false);
              animateSearchBlur();
              animateChipsOut();
            }}
          />
          {isSearchFocused && (
            <TouchableOpacity
              onPress={() => {
                setIsSearchFocused(false);
                toggleSearchResultsView(false);
                if (searchInputRef.current) {
                  searchInputRef.current.blur(); // This will remove the focus from the TextInput
                }
                // Additional logic to unfocus the TextInput if needed
              }}
              style={{ marginLeft: Sizes.fixPadding }}
            >
              <Text style={{ ...Fonts.primaryColor15Medium }}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        {isSearchFocused && (
          <Animated.View
            style={{
              marginTop: Sizes.fixPadding,
              opacity: chipsAnimation,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: Sizes.fixPadding }}
            >
              {chipData.map(renderChip)}
            </ScrollView>
          </Animated.View>
        )}
      </Animated.View>
    );
  }
};

let rowSwipeAnimatedValues = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const MovieWatchlist = ({ data, navigation }) => {
  const [movieReleases, setMovieReleases] = useState(data);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const renderItem = (movieWatchlist) => (
    <TouchableHighlight
      style={{ backgroundColor: "rgba(0,0,0,0.0)" }}
      activeOpacity={0.9}
      onPress={() =>
        navigation.push("MovieDetail", { data: movieWatchlist.item })
      }
    >
      <View style={stylesMovieList.watchlistInfoWrapStyle}>
        <ImageBackground
          source={{
            uri: URLS.TMDB_IMAGE_URL + movieWatchlist.item.poster_path,
          }}
          style={stylesMovieList.imageStyle}
          borderRadius={Sizes.fixPadding - 5.0}
        ></ImageBackground>
        <View
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            marginRight: Sizes.fixPadding - 5.0,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor14Medium }}>
            {movieWatchlist.item.original_title
              ? movieWatchlist.item.original_title
              : movieWatchlist.item.name}
          </Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              lineHeight: 20.0,
              ...Fonts.grayColor16Regular,
            }}
          >
            {movieWatchlist.item.release_date
              ? movieWatchlist.item.release_date.split("-")[0]
              : ""}
          </Text>
          <Text style={{ lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
            {movieWatchlist.item.id}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                marginTop: Sizes.fixPadding - 5.0,
                lineHeight: 18.0,
                flex: 1,
                ...Fonts.whiteColor14Regular,
              }}
            >
              {movieWatchlist.item.id} Episodes | size -{" "}
              {movieWatchlist.item.id}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="download" size={16} color={Colors.primaryColor} />
              <Text
                style={{
                  marginLeft: Sizes.fixPadding - 7.0,
                  ...Fonts.primaryColor15Medium,
                }}
              >
                Download
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={{ flex: 1 }}>
      {data.length == 0 ? (
        noItemsInfo()
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            key={data.length}
            data={data}
            renderItem={renderItem}
            renderHiddenItem={(data, rowMap) => <></>}
            rightOpenValue={-70}
            // onSwipeValueChange={onSwipeValueChange}
            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            scrollEnabled={false}
          />
        </View>
      )}
      <Snackbar
        style={stylesMovieList.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>
          Removed from shortList
        </Text>
      </Snackbar>
    </View>
  );

  function noItemsInfo() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Feather name="bookmark" size={30} color={Colors.grayColor} />
        <Text
          style={{
            ...Fonts.grayColor18Medium,
            marginTop: Sizes.fixPadding - 5.0,
          }}
        >
          No Search Results yet
        </Text>
      </View>
    );
  }
};

const stylesMovieList = StyleSheet.create({
  headerWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingTop: Sizes.fixPadding * 2.0,
    paddingBottom: Sizes.fixPadding + 5.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blackColor,
  },
  watchlistTypeTabWrapStyle: {
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.blackColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
  backDeleteContinerStyle: {
    alignItems: "center",
    bottom: 20,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 60,
    backgroundColor: Colors.primaryColor,
    borderTopRightRadius: Sizes.fixPadding - 5.0,
    borderBottomRightRadius: Sizes.fixPadding - 5.0,
    right: 0,
  },
  playArrowIconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 60.0,
    height: 80.0,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  watchlistInfoWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

const styles = StyleSheet.create({
  headerWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  searchFieldWrapStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: Sizes.fixPadding - 1.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 1.0,
  },
  searchCategoryWrapStyle: {
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    backgroundColor: "#282828",
    borderRadius: Sizes.fixPadding - 5.0,
    marginRight: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
  },
  categoryInfoWrapStyle: {
    marginTop: Sizes.fixPadding * 2.0,
    marginLeft: Sizes.fixPadding * 2.0,
    marginRight: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  recentSearchTitleWrapStyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryImageShadowStyle: {
    flex: 1,
    borderRadius: Sizes.fixPadding - 5.0,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  movieCategoryInfoWrapStyle: {
    width: width * 0.35,
    height: 80.0,
    borderRadius: Sizes.fixPadding - 5.0,
    elevation: 5.0,
    marginRight: Sizes.fixPadding,
  },
  suggestionTitleWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Sizes.fixPadding,
  },
  movieImageStyle: {
    height: height * 0.135,
    borderRadius: Sizes.fixPadding - 5.0,
    width: width * 0.33,
  },
  chipStyle: {
    // backgroundColor: "lightgray", // Example background color
    borderRadius: 20, // Rounded corners
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10, // Space between chips
  },
  chipTextStyle: {
    color: "white", // Text color
    fontWeight: "bold",
    // Add other text styling as needed
  },
  selectedChipStyle: {
    // Style for selected chip
    backgroundColor: "#00b020", // Example: Different background color
    borderRadius: 20, // Rounded corners
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10, // Space between chips
  },
});

export default SearchScreen;
