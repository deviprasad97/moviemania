import React, { useState, useEffect } from "react";
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
  TouchableHighlight,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";

let rowSwipeAnimatedValues = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  });

const MovieWatchlist = ({ data }) => {
  const [movieReleases, setMovieReleases] = useState([{ key: "1" }]);
  const release_year = data.release_date.split("-")[0];
  useEffect(() => {
    fetch(
      `http://192.168.50.148:5000/getMovieReleasesByQuery?query=${data.original_title} ${release_year}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDUzN2ZiN2U0N2VlMDI2Y2VhMTMwN2NmZTc2MzkzOSIsInN1YiI6IjY1ODY0MGQ1NWFiYTMyNjc1OWI5MDQwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uz31XqIIjE5CSCUKl4v1eE21rgjz8j6xzbL9em2_Sxk",
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((json) => {
        setMovieReleases(json.releases);
        Array(json.releases.length + 1)
          .fill("")
          .forEach((_, i) => {
            rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
          });
      }) // Update the state with the data
      .catch((error) => {
        console.error(error);
        setMovieReleases([]);
      }); // Handle any errors
  }, []);

  const [showSnackBar, setShowSnackBar] = useState(false);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...movieReleases];
    const prevIndex = movieReleases.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setShowSnackBar(true);
    setMovieReleases(newData);
  };

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = (movieWatchlist) => (
    <TouchableHighlight
      style={{ backgroundColor: "rgba(0,0,0,0.0)" }}
      activeOpacity={0.9}
    >
      <View style={stylesMovieList.watchlistInfoWrapStyle}>
        <ImageBackground
          source={{ uri: movieWatchlist.item.image }}
          style={stylesMovieList.imageStyle}
          borderTopLeftRadius={Sizes.fixPadding - 5.0}
          borderBottomLeftRadius={Sizes.fixPadding - 5.0}
        ></ImageBackground>
        <View
          style={{
            flex: 1,
            marginLeft: Sizes.fixPadding,
            marginRight: Sizes.fixPadding - 5.0,
          }}
        >
          <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Medium }}>
            {movieWatchlist.item.release_title}
          </Text>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              lineHeight: 20.0,
              ...Fonts.grayColor16Regular,
            }}
          >
            {movieWatchlist.item.price}
          </Text>
          <Text style={{ lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
            {movieWatchlist.item.price}
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
              {movieWatchlist.item.type} Episodes | size -{" "}
              {movieWatchlist.item.type}
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

  const renderHiddenItem = (data, rowMap) => (
    <View style={{ alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={stylesMovieList.backDeleteContinerStyle}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 60],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <MaterialIcons
            name="add-to-photos"
            size={24}
            color={Colors.whiteColor}
            style={{ alignSelf: "center" }}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {movieReleases.length == 0 ? (
        noItemsInfo()
      ) : (
        <View style={{ flex: 1 }}>
          <SwipeListView
            key={movieReleases.length}
            data={movieReleases}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-70}
            onSwipeValueChange={onSwipeValueChange}
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
          No releases yet
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
    width: 100.0,
    height: 120.0,
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

export default MovieWatchlist;
