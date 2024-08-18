import React, { useState, useEffect, useRef } from "react";
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
  LayoutAnimation,
  TouchableWithoutFeedback,
} from "react-native";
import { Divider } from "@rneui/themed";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { URLS } from "../../constants/config";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Snackbar } from "react-native-paper";
import MovieWatchlist from "../../components/releaseInfo";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import HorizontalDivider from "../../components/horizontalDivider";

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

const FirstRoute = ({ props, data }) => (
  <ScrollView style={[styles.scene, { backgroundColor: "transparent" }]}>
    {console.log(data)}
    <MovieWatchlist data={data}></MovieWatchlist>
  </ScrollView>
);

const SecondRoute = ({ data }) => (
  <View style={[styles.scene, { backgroundColor: "transparent" }]}>
    <Text>Crew</Text>
    <Divider orientation="vertical" width={50} color="#2089dc" />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "transparent" }]}>
    <Text>Details</Text>
    <Divider orientation="vertical" width={50} color="#2089dc" />
  </View>
);

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: "transparent" }]}>
    <Text>Genres</Text>
  </View>
);

const TabViewExample = ({ data }) => {
  const [index, setIndex] = React.useState(0);
  const [height, setHeight] = useState(0);
  const [routes] = React.useState([
    { key: "release", title: "Releases" },
    { key: "cast", title: "Cast" },
    { key: "crew", title: "Crew" },
    { key: "details", title: "Details" },
    { key: "genres", title: "Genres" },
  ]);

  const animatedHeight = useRef(new Animated.Value(1000)).current;
  
  const renderLabel = ({ route, focused }) => (
    <Text
      style={[
        styles.tabLabel,
        focused ? styles.focusedTab : styles.unfocusedTab,
      ]}
      numberOfLines={1}
      ellipsizeMode="tail" // Add an ellipsis at the end if the text is too long
    >
      {route.title}
    </Text>
  );

  const renderScene = ({ route, data }) => {
    switch (route.key) {
      case 'release':
        return <FirstRoute data={data}/>;
      case 'cast':
        return <SecondRoute data={data} />;
      default:
        return <ThirdRoute/>;
    }
  };

  const _onTabChange = (index) => {
    let newHeight = 100; // Default height

    switch (index) {
      case 0:
        newHeight = 1000;
        break;
      case 1:
        newHeight = 100;
        break;
      case 2:
        newHeight = 100;
        break;
      case 3:
        newHeight = 100;
        break;
      case 4:
        newHeight = 100;
        break;
    }

    Animated.spring(animatedHeight, {
      toValue: newHeight,
      friction: 8, // Adjust for a smoother spring effect
      tension: 40, // Higher tension for a tighter spring
      useNativeDriver: false, // Height can't be animated with native driver
    }).start();
  };
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      navigationState={{ index, routes }}
      renderLabel={renderLabel}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{
        backgroundColor: "#0e0e10",
        justifyContent: "center",
        height: 38,
        marginBottom: 10,
        borderRadius: 5,
        marginLeft: 15,  // Apply margin to TabBar only
        marginRight: 15, // Apply margin to TabBar only
      }}
      labelStyle={styles.tabLabel}
      renderIndicator={(props) => {
        // Destructure the width of the layout and the navigationState
        const { width } = props.layout;
        const { navigationState } = props;

        // Calculate the width for the individual tab
        const tabWidth = width / navigationState.routes.length;

        // Calculate the left position of the indicator
        const translateX = props.position.interpolate({
          inputRange: [0, navigationState.routes.length - 1],
          outputRange: [0, width - tabWidth],
        });

        // Custom indicator style
        return (
          <Animated.View
            style={[
              styles.indicator,
              { width: tabWidth, transform: [{ translateX }] },
            ]}
          />
        );
      }}
    />
  );

  return (
    <Animated.View style={{ height: animatedHeight }}>
    <TabView
      lazy={true}
      navigationState={{ index, routes }}
      renderScene={(props) => renderScene({ ...props, data })}
      onIndexChange={(index) => {
        setIndex(index);
        _onTabChange(index);
      }}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
      style={{
        margin: 0,
        marginBottom: 10,
      }}
    />
    </Animated.View>
  );
};

const MovieDetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const scrollY = new Animated.Value(0);
  const statusBarOpacity = scrollY.interpolate({
    inputRange: [0, height / 3.6], // Assuming height / 3.6 is the height of your poster
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const initialBackArrowOpacity = scrollY.interpolate({
    inputRange: [0, height / 3.6], // Adjust based on the height of your image
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const popularMoviesEndpointSufix = `/movie/${data.id}?language=en-US`;
  const [state, setState] = useState({
    inWatchlist: false,
    showSnackBar: false,
  });
  const [movieDetail, setMovieDetail] = useState({});
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const { inWatchlist, showSnackBar } = state;

  useEffect(() => {
    fetch(URLS.TMDB_API + popularMoviesEndpointSufix, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDUzN2ZiN2U0N2VlMDI2Y2VhMTMwN2NmZTc2MzkzOSIsInN1YiI6IjY1ODY0MGQ1NWFiYTMyNjc1OWI5MDQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz31XqIIjE5CSCUKl4v1eE21rgjz8j6xzbL9em2_Sxk",
        accept: "application/json",
      },
    })
      .then((response) => response.json()) // Convert the response to JSON
      .then((json) => {
        setMovieDetail(json);
      }) // Update the state with the data
      .catch((error) => console.error(error)); // Handle any errors
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="light-content"
      />
      {/* Back Arrow set up with status bar */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: StatusBar.currentHeight + 100, // Adjust the height as needed
          backgroundColor: "black",
          opacity: statusBarOpacity,
          flexDirection: "row",
          alignItems: "center",
          paddingTop: StatusBar.currentHeight,
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.pop()}
          style={styles.backArrowWrapStyle}
        >
          <MaterialIcons
            name="arrow-back-ios"
            color={Colors.whiteColor}
            size={24}
            style={{
              paddingHorizontal: 10,
            }}
          />
        </TouchableOpacity>
        <Text
          style={[
            {
              ...Fonts.whiteColor20SemiBold,
              top: Sizes.fixPadding * 2.0 + StatusBar.currentHeight,
            },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.original_title}
        </Text>
      </Animated.View>

      {/* Initial Back Arrow set up */}
      <Animated.View
        style={{
          position: "absolute",
          top: StatusBar.currentHeight,
          left: 1,
          opacity: initialBackArrowOpacity, // Apply the inverse opacity here
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.pop()}
          style={styles.backArrowWrapStyle}
        >
          <MaterialIcons
            name="arrow-back-ios"
            color={Colors.whiteColor}
            size={24}
            style={{
              paddingHorizontal: 10,
            }}
          />
        </TouchableOpacity>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: -height / 4.5 }}>
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: height / 4.5 }}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {posterWithBackArrow(data)}
            {moviewInfo(data)}
            <HorizontalDivider />
            <TabViewExample data={data}></TabViewExample>
            {/* <MovieWatchlist data={data}></MovieWatchlist> */}
            <HorizontalDivider />
            {clipsInfo()}
            <HorizontalDivider />
            {reviewsInfo()}
          </Animated.ScrollView>
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
    const [isExpanded, setIsExpanded] = useState(false);
    const [textHeight, setTextHeight] = useState(0);
    const MAX_HEIGHT = 50; // Maximum collapsed height of the text
    const GRADIENT_HEIGHT = 30; // Height of the gradient blur

    const toggleExpansion = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsExpanded(!isExpanded);
    };

    return (
      <View
        style={{
          marginTop: Sizes.fixPadding - 20,
          marginBottom: Sizes.fixPadding,
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
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                { ...Fonts.whiteColor22Bold },
                { width: 200, flexWrap: "wrap", paddingBottom: 20 },
              ]}
            >
              {movieData.original_title}
            </Text>
            <Text
              style={[
                { ...Fonts.geryColor12Regular },
                { width: 200, flexWrap: "wrap" },
              ]}
            >
              {"2023"}
              <Text style={{ color: "#445566" }}> • </Text>
              {"DIRECTED BY"}
            </Text>
          </View>
          <ImageBackground
            source={{ uri: URLS.TMDB_IMAGE_URL + data.poster_path }}
            style={styles.imageStyle}
            borderRadius={Sizes.fixPadding - 5.0}
          ></ImageBackground>
        </View>
        {/* <View
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
        </View> */}
        {/* <Text
          style={{
            marginTop: Sizes.fixPadding,
            lineHeight: 24.0,
            ...Fonts.whiteColor18Regular,
          }}
        >
          {movieData.release_date} • 13+ • Action & Adventure • 1h 30min
        </Text> */}
        <View
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding - 3.0,
          }}
        >
          {showRating({ number: 5.0 })}
        </View>
        <TouchableWithoutFeedback onPress={toggleExpansion}>
          <View>
            <Text
              numberOfLines={isExpanded ? undefined : 3}
              style={{ ...Fonts.whiteColor15Regular }}
              onLayout={(event) => {
                if (!isExpanded) {
                  const { height } = event.nativeEvent.layout;
                  setTextHeight(height);
                }
              }}
            >
              {movieData.overview}
            </Text>
            {!isExpanded && textHeight > MAX_HEIGHT && (
              <LinearGradient
                colors={["rgba(24, 28, 32, 0.1)", "#181c20"]} // Adjust colors for the blur effect
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: GRADIENT_HEIGHT, // Adjust gradient height
                }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
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
    const scale = scrollY.interpolate({
      inputRange: [-100, 0, 50],
      outputRange: [2, 1.6, 1.45],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
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
            style={{ flex: 1, justifyContent: "center", marginTop: -100 }}
          ></LinearGradient>
        </ImageBackground>
      </Animated.View>
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
    top: Sizes.fixPadding * 5.0 + StatusBar.currentHeight,
    left: Sizes.fixPadding * 2.0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black background with opacity
    borderRadius: 20, // Circular shape
    width: 35, // Adjust width as needed
    height: 35, // Adjust height as needed
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
    width: 120.0,
    height: 170.0,
    alignItems: "center",
    justifyContent: "center",
  },
  scene: { flex: 1, height: 100 },
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
    fontSize: width * 0.029,
    margin: 0, // Margin between tabs
    padding: 0,
    fontWeight: "bold",
    textTransform: "none",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 20, // Match with tab borderRadius if using
  },
  focusedTab: {
    // Styling for focused tab label
    color: "#fff",
  },
  unfocusedTab: {
    // Styling for unfocused tab label
    color: "#8899aa",
  },
  indicator: {
    position: "absolute",
    height: "100%", // Covers the full height of the tab bar
    backgroundColor: "rgba(102,119,135,255)", // Customizable color and opacity
    borderRadius: 5, // Optional: if you want rounded corners
  },
});

export default MovieDetailScreen;
