import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Snackbar } from "react-native-paper";

const { height } = Dimensions.get("window");
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";

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

const starCastList = [
  {
    id: "1",
    starCastImage: require("../../assets/images/starCast/starCast1.png"),
    starCastName: "Lee Jung jae",
  },
  {
    id: "2",
    starCastImage: require("../../assets/images/starCast/starCast2.png"),
    starCastName: "Park Hae soo",
  },
  {
    id: "3",
    starCastImage: require("../../assets/images/starCast/starCast3.png"),
    starCastName: "Wi Ha jun",
  },
  {
    id: "4",
    starCastImage: require("../../assets/images/starCast/starCast4.png"),
    starCastName: "Jung Ho yeon",
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

const WebSeriesDetailScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [state, setState] = useState({
    showSnackBar: false,
    inWatchlist: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showSnackBar, inWatchlist } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <View style={{ flex: 1 }}>
        {posterWithBackArrow(data)}
        <View style={{ flex: 1, marginTop: -height / 4.5 }}>
          <ScrollView
            contentContainerStyle={{ paddingTop: height / 4.5 }}
            showsVerticalScrollIndicator={false}
          >
            {webSeriesInfo(data)}
            {starCastInfo()}
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
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
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

  function starCastInfo() {
    const renderItem = ({ item }) => (
      <View style={{ alignItems: "center", marginRight: Sizes.fixPadding }}>
        <Image source={item.starCastImage} style={styles.starCastImageStyle} />
        <Text
          numberOfLines={1}
          style={{ maxWidth: 86.0, ...Fonts.whiteColor15Regular }}
        >
          {item.starCastName}
        </Text>
      </View>
    );
    return (
      <View style={{ marginVertical: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          Star Cast
        </Text>
        <FlatList
          data={starCastList}
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

  function webSeriesInfo(data) {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
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
          <Text style={{ ...Fonts.whiteColor20SemiBold }}>
            {data.original_title}
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
        <Text style={{ ...Fonts.whiteColor18Regular }}>
          2021 • 18+ • Tv Drama
        </Text>
        <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
          {showRating({ number: 5.0 })}
        </View>
        <Text style={{ ...Fonts.whiteColor15Regular }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae ac,
          eros platea elit mi, vel consectetur congue neque. Mattis nisl est
          euismod elementum orci integer aliquam dictumst.
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

  function posterWithBackArrow(data) {
    return (
      <ImageBackground
        source={{ uri: TMDB_IMAGE_URL + data.poster_path }}
        style={{
          height: height / 1.6 + StatusBar.currentHeight,
          justifyContent: "center",
        }}
      >
        <LinearGradient
          colors={gradientColorsList}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <MaterialIcons
            name="arrow-back"
            color={Colors.whiteColor}
            size={26}
            onPress={() => navigation.pop()}
            style={{
              marginHorizontal: Sizes.fixPadding * 2.0,
              top: Sizes.fixPadding * 2.0 + StatusBar.currentHeight,
              position: "absolute",
            }}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.push("Episodes")}
            style={styles.playArrowWrapStyle}
          >
            <MaterialIcons
              name="play-arrow"
              size={24}
              color={Colors.whiteColor}
            />
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
    backgroundColor: Colors.whiteColor,
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
  starCastImageStyle: {
    width: 86.0,
    height: 86.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding - 5.0,
  },
  snackBarStyle: {
    backgroundColor: "#333333",
    position: "absolute",
    left: -10.0,
    right: -10.0,
    bottom: -10.0,
  },
});

export default WebSeriesDetailScreen;
