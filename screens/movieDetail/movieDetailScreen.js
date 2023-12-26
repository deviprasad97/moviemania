import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Divider } from "@rneui/themed";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { URLS } from "../../constants/config";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Snackbar } from "react-native-paper";
import MovieWatchlist from "../../components/releaseInfo";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const { width, height } = Dimensions.get("window");

const clipsList = [
  {
    id: "1",
    clipImage: require("../../assets/images/clips/clip1.png"),
    clipViewTime: "1:50min",
    trailerOrTeaser: "Trailer",
  },
  {
    id: "2",
    clipImage: require("../../assets/images/clips/clip2.png"),
    clipViewTime: "30sec",
    trailerOrTeaser: "Teaser",
  },
  {
    id: "3",
    clipImage: require("../../assets/images/clips/clip3.png"),
    clipViewTime: "50sec",
    trailerOrTeaser: "Teaser",
    trailerOrTeaserNumber: 2,
  },
  {
    id: "4",
    clipImage: require("../../assets/images/clips/clip4.png"),
    clipViewTime: "50sec",
    trailerOrTeaser: "Teaser",
    trailerOrTeaserNumber: 3,
  },
];

const reviewsList = [
  {
    id: "1",
    userImage: require("../../assets/images/users/user1.png"),
    userName: "Jane Cooper",
    reviewDate: "24 May, 2020",
    rating: 4.0,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit ullamco Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "2",
    userImage: require("../../assets/images/users/user2.png"),
    userName: "Leslie Alexander",
    reviewDate: "17 Oct, 2020",
    rating: 4.0,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit ullamco Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "3",
    userImage: require("../../assets/images/users/user3.png"),
    userName: "Brooklyn Simmons",
    reviewDate: "22 Oct, 2020",
    rating: 3.0,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit ullamco Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "4",
    userImage: require("../../assets/images/users/user4.png"),
    userName: "Guy Hawkins",
    reviewDate: "8 Sep, 2020",
    rating: 4.0,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit ullamco Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: "5",
    userImage: require("../../assets/images/users/user5.png"),
    userName: "Jenny Wilson",
    reviewDate: "24 May, 2020",
    rating: 4.0,
    review:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit ullamco Exercitation veniam consequat sunt nostrud amet.",
  },
];

const gradientColorsList = [
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "transparent",
  "rgba(18, 18, 18, 0.8)",
  "rgba(18, 18, 18, 0.97)",
  Colors.bodyBackColor,
];

const movieWatchlist = [
  {
    key: "1",
    movieImage: require("../../assets/images/popular/popular10.png"),
    movieName: "See You Yesterday",
    movieCategories: "Comedy, Drama",
    movieLanguages: "English",
    episodes: 10,
    memoryTaken: "1.5GB",
  },
  {
    key: "2",
    movieImage: require("../../assets/images/popularMovies/movie7.png"),
    movieName: "Dhamaka",
    movieCategories: "Action, Drama",
    movieLanguages: "English, Hindi",
    episodes: 12,
    memoryTaken: "2GB",
  },
  {
    key: "3",
    movieImage: require("../../assets/images/popular/popular14.png"),
    movieName: "Unbelievable",
    movieCategories: "Comedy, Drama",
    movieLanguages: "English",
    episodes: 8,
    memoryTaken: "1.5GB",
  },
  {
    key: "4",
    movieImage: require("../../assets/images/popular/popular15.png"),
    movieName: "I am not okay with this",
    movieCategories: "Comedy, Drama",
    movieLanguages: "English",
    episodes: 12,
    memoryTaken: "1.2GB",
  },
  {
    key: "5",
    movieImage: require("../../assets/images/popular/popular13.png"),
    movieName: "Let The Battles Begin",
    movieCategories: "Comedy, Drama, Action",
    movieLanguages: "English",
    episodes: 9,
    memoryTaken: "1.5GB",
  },
  {
    key: "6",
    movieImage: require("../../assets/images/popular/popular11.png"),
    movieName: "House of Cards",
    movieCategories: "Action, Drama, Mystery",
    movieLanguages: "English, Hindi",
    episodes: 4,
    memoryTaken: "2.2GB",
  },
  {
    key: "7",
    movieImage: require("../../assets/images/popular/popular9.png"),
    movieName: "Rapture",
    movieCategories: "Comedy, Drama, Adventure",
    movieLanguages: "English, Hindi",
    episodes: 10,
    memoryTaken: "1.5GB",
  },
  {
    key: "8",
    movieImage: require("../../assets/images/popular/popular8.png"),
    movieName: "In The Shadow of The Moon",
    movieCategories: "Comedy, Drama",
    movieLanguages: "English",
    episodes: 9,
    memoryTaken: "1.2GB",
  },
  {
    key: "9",
    movieImage: require("../../assets/images/popularMovies/movie8.png"),
    movieName: "Big Bang Theory",
    movieCategories: "Comedy, Drama",
    movieLanguages: "English",
    episodes: 12,
    memoryTaken: "1.5GB",
  },
  {
    key: "10",
    movieImage: require("../../assets/images/popularMovies/movie9.png"),
    movieName: "Stranger Things",
    movieCategories: "Action, Drama",
    movieLanguages: "English, Hindi",
    episodes: 10,
    memoryTaken: "2GB",
  },
];

const rowSwipeAnimatedValues = {};
Array(movieWatchlist.length + 1)
  .fill("")
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    <Text>Cast |</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
    <Text>Crew</Text>
    <Divider orientation="vertical" width={50} color="#2089dc" />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#3f51b5" }]}>
    <Text>Details</Text>
    <Divider orientation="vertical" width={50} color="#2089dc" />
  </View>
);

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#2196f3" }]}>
    <Text>Genres</Text>
  </View>
);

const renderScene = SceneMap({
  cast: FirstRoute,
  crew: SecondRoute,
  details: ThirdRoute,
  genres: FourthRoute,
});

function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "cast", title: "Cast" },
    { key: "crew", title: "Crew" },
    { key: "details", title: "Details" },
    { key: "genres", title: "Genres" },
  ]);

  const renderTabBar = (props) => (
    // <View style={styles.tabBarBackground}>
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "black" }}
      // No indicator
    />
    // </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{
        height: 100,
        width: width,
      }}
      renderTabBar={renderTabBar}
      style={{
        borderRadius: 20,
        margin: 0,
        paddingLeft: 8,
        paddingRight: 8,
        marginBottom: 10,
      }}
    />
  );
}

const MovieDetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [state, setState] = useState({
    inWatchlist: false,
    showSnackBar: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { inWatchlist, showSnackBar } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <View style={{ flex: 1 }}>
        {posterWithBackArrow(data)}
        <View style={{ flex: 1, marginTop: -height / 4.5 }}>
          <ScrollView
            contentContainerStyle={{ paddingTop: height / 8.0 }}
            showsVerticalScrollIndicator={false}
          >
            {moviewInfo(data)}
            <TabViewExample></TabViewExample>
            <MovieWatchlist data={data}></MovieWatchlist>
            {clipsInfo()}
            {reviewsInfo()}
          </ScrollView>
        </View>
      </View>
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => updateState({ showSnackBar: false })}
        style={styles.snackBarStyle}
      >
        <Text style={{ ...Fonts.whiteColor16Medium }}>
          {inWatchlist ? "Added In Watchlist" : "Remove From Watchlist"}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );

  function reviewsInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          Reviews
        </Text>
        {reviewsList.map((item) => (
          <View
            key={`${item.id}`}
            style={{ marginBottom: Sizes.fixPadding + 10.0 }}
          >
            <View
              style={{
                marginBottom: Sizes.fixPadding,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={item.userImage}
                  style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
                />
                <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                  <Text style={{ ...Fonts.whiteColor18Medium }}>
                    {item.userName}
                  </Text>
                  <Text style={{ ...Fonts.grayColor15Regular }}>
                    {item.reviewDate}
                  </Text>
                </View>
              </View>
              {showRating({ number: item.rating })}
            </View>
            <Text style={{ ...Fonts.whiteColor14Regular }}>{item.review}</Text>
          </View>
        ))}
      </View>
    );
  }

  function clipsInfo() {
    const renderItem = ({ item }) => (
      <ImageBackground
        source={item.clipImage}
        style={styles.clipImageStyle}
        borderRadius={Sizes.fixPadding - 5.0}
      >
        <View style={styles.clipImageShadowStyle}>
          <Text
            style={{
              position: "absolute",
              top: 0.0,
              right: 5.0,
              ...Fonts.whiteColor10Medium,
            }}
          >
            {item.clipViewTime}
          </Text>
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.playArrowIconWrapStyle}>
              <MaterialIcons
                name="play-arrow"
                color={Colors.whiteColor}
                size={15}
              />
            </View>
            <Text style={{ ...Fonts.whiteColor14Medium }}>
              {item.trailerOrTeaser}{" "}
              {item.trailerOrTeaserNumber ? item.trailerOrTeaserNumber : null}:
              Red Notice
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
    return (
      <View style={{ marginVertical: Sizes.fixPadding }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          Clips
        </Text>
        <FlatList
          data={clipsList}
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

  function moviewInfo(movieData) {
    return (
      <View
        style={{
          marginVertical: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ImageBackground
            source={{ uri: URLS.TMDB_IMAGE_URL + data.poster_path }}
            style={styles.imageStyle}
            borderRadius={Sizes.fixPadding - 5.0}
          ></ImageBackground>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...Fonts.whiteColor20SemiBold }}>
            {movieData.original_title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name={inWatchlist ? "bookmark" : "bookmark-border"}
              size={20}
              color={Colors.whiteColor}
              style={{ marginRight: Sizes.fixPadding * 2.0 }}
              onPress={() =>
                updateState({ inWatchlist: !inWatchlist, showSnackBar: true })
              }
            />
            <Feather name="download" size={20} color={Colors.whiteColor} />
          </View>
        </View>
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            lineHeight: 24.0,
            ...Fonts.whiteColor18Regular,
          }}
        >
          {movieData.release_date} • 13+ • Action & Adventure • 1h 30min
        </Text>
        <View
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding - 3.0,
          }}
        >
          {showRating({ number: 5.0 })}
        </View>
        <Text style={{ ...Fonts.whiteColor15Regular }}>
          {movieData.overview}
        </Text>
      </View>
    );
  }

  function showRating({ number }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {number == 5.0 ||
        number == 4.0 ||
        number == 3.0 ||
        number == 2.0 ||
        number == 1.0 ? (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.yellowColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        ) : (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.grayColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        )}
        {number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 ? (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.yellowColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        ) : (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.grayColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        )}
        {number == 5.0 || number == 4.0 || number == 3.0 ? (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.yellowColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        ) : (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.grayColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        )}
        {number == 5.0 || number == 4.0 ? (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.yellowColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        ) : (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.grayColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        )}
        {number == 5.0 ? (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.yellowColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        ) : (
          <MaterialIcons
            name="star"
            size={16}
            color={Colors.grayColor}
            style={{ marginRight: Sizes.fixPadding - 8.0 }}
          />
        )}
      </View>
    );
  }

  function posterWithBackArrow(movieData) {
    return (
      <ImageBackground
        source={{ uri: URLS.TMDB_IMAGE_URL + data.backdrop_path }}
        style={[
          {
            height: height / 3.6 + StatusBar.currentHeight,
            justifyContent: "center",
          },
        ]}
      >
        <LinearGradient
          colors={gradientColorsList}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.pop()}
            style={styles.backArrowWrapStyle}
          >
            <MaterialIcons
              name="arrow-back-ios"
              color={Colors.whiteColor}
              size={15}
              style={{
                paddingHorizontal: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push("Movie")}
            // style={styles.playArrowWrapStyle}
          >
            {/* <MaterialIcons
              name="play-arrow"
              size={24}
              color={Colors.whiteColor}
            /> */}
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    padding: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.blackColor,
  },
  playArrowWrapStyle: {
    width: 40.0,
    height: 40.0,
    borderRadius: 20.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    alignSelf: "center",
  },
  backArrowWrapStyle: {
    position: "absolute",
    top: Sizes.fixPadding * 2.0 + StatusBar.currentHeight,
    left: Sizes.fixPadding * 1.0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black background with opacity
    borderRadius: 20, // Circular shape
    width: 30, // Adjust width as needed
    height: 30, // Adjust height as needed
    alignItems: "center", // Center the icon horizontally
    justifyContent: "center", // Center the icon vertically
  },
  snackBarStyle: {
    backgroundColor: "#333333",
    position: "absolute",
    left: -10.0,
    right: -10.0,
    bottom: -10.0,
  },
  playArrowIconWrapStyle: {
    width: 25.0,
    height: 25.0,
    borderRadius: 12.5,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding - 7.0,
  },
  clipImageStyle: {
    width: width * 0.43,
    height: height * 0.135,
    borderRadius: Sizes.fixPadding - 5.0,
    marginRight: Sizes.fixPadding,
  },
  clipImageShadowStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: Sizes.fixPadding - 5.0,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 100.0,
    height: 150.0,
    alignItems: "center",
    justifyContent: "center",
  },
  scene: { flex: 1 },
  tabBarBackground: {
    backgroundColor: "#0e0e10", // Background color of the entire tab bar
    padding: 2,
    borderRadius: 1000,
    width: "100%",
    borderTopLeftRadius: 1000,
  },
  tabBar: {
    elevation: 0, // For Android - remove shadow
    shadowOpacity: 2, // For iOS - remove shadow
    backgroundColor: "transparent", // Make the tab bar background transparent
    borderTopWidth: 0, // No border at the top
    height: "auto",
    margin: 0,
    paddingLeft: 3,
    paddingRight: 3,
    alignContent: "flex-start",
  },
  tab: {
    backgroundColor: "#0e0e10", // Background color for each tab
    padding: 0, // Padding around the label
    // paddingLeft: 3,
    borderColor: "gray", // Color of the separator
    alignContent: "stretch",
  },
  activeTab: {
    backgroundColor: "#383838", // Background color for the active tab
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    textTransform: "none",
    padding: 0, // Padding around the label
    margin: 0, // Margin between tabs
  },
  tabLabel: {
    flex: 1,
    margin: 0, // Margin between tabs
    alignItems: "center",
    justifyContent: "center",
    alignContent: "top",
    borderRadius: 20, // Match with tab borderRadius if using
  },
  indicator: {
    backgroundColor: "#ffffff", // Hide the default indicator
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});

export default MovieDetailScreen;
