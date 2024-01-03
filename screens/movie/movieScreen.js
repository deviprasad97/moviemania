import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const similarMoviesList = [
  {
    id: "1",
    movieImage: require("../../assets/images/popularMovies/similar1.png"),
  },
  {
    id: "2",
    movieImage: require("../../assets/images/popularMovies/similar2.png"),
  },
  {
    id: "3",
    movieImage: require("../../assets/images/popularMovies/movie3.png"),
  },
  {
    id: "4",
    movieImage: require("../../assets/images/popularMovies/similar3.png"),
  },
  {
    id: "5",
    movieImage: require("../../assets/images/popularMovies/similar4.png"),
  },
];

const moreLikeMoviesList = [
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

const MovieScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setisPlay(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setisPlay(false);
    });
    return unsubscribe;
  }, [navigation]);

  const [isPlay, setisPlay] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ShowVideo
          videoUrl={require("../../assets/video/video.mp4")}
          videoStatus={isPlay}
        />
        {backArrow()}
        <FlatList
          ListHeaderComponent={
            <>
              {movieInfo()}
              {similarMoviesInfo()}
              {moreLikeInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function moreLikeInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          ...styles.movieImageStyle,
          marginBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding - 5.0,
        }}
        onPress={() => navigation.push("MovieDetail")}
      >
        <Image source={item.movieImage} style={styles.movieImageStyle} />
      </TouchableOpacity>
    );
    return (
      <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          More Like This
        </Text>
        <View style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}>
          <FlatList
            listKey="moreLike"
            data={moreLikeMoviesList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }

  function similarMoviesInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          ...styles.movieImageStyle,
          marginBottom: Sizes.fixPadding,
          marginHorizontal: Sizes.fixPadding - 5.0,
        }}
        onPress={() => navigation.push("MovieDetail")}
      >
        <Image source={item.movieImage} style={styles.movieImageStyle} />
      </TouchableOpacity>
    );
    return (
      <View>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          Similar Movies
        </Text>
        <View style={{ marginHorizontal: Sizes.fixPadding + 5.0 }}>
          <FlatList
            listKey="similarMovie"
            data={similarMoviesList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={renderItem}
            numColumns={3}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }

  function backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        color={Colors.whiteColor}
        size={24}
        style={{ position: "absolute", top: 20.0, left: 20.0 }}
        onPress={() => {
          setisPlay(false);
          navigation.pop();
        }}
      />
    );
  }

  function movieInfo() {
    return (
      <View style={{ margin: Sizes.fixPadding * 2.0 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={1}
            style={{ flex: 1, ...Fonts.whiteColor18Medium }}
          >
            Red Notice
          </Text>
          <Feather name="download" size={20} color={Colors.whiteColor} />
        </View>
        <Text
          style={{
            marginTop: Sizes.fixPadding - 5.0,
            ...Fonts.whiteColor15Regular,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae ac,
          eros platea elit mi, vel consectetur congue neque. Mattis nisl est
          euismod elementum orci integer aliquam dictumst.
        </Text>
      </View>
    );
  }
};

const ShowVideo = ({ videoUrl, videoStatus }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={{ alignItems: "center" }}>
      {videoPlayer()}
      {backDropContainer()}
      {playButton()}
    </View>
  );

  function videoPlayer() {
    return (
      <Video
        ref={video}
        style={styles.video}
        source={videoUrl}
        useNativeControls
        resizeMode="cover"
        shouldPlay={videoStatus}
        isLooping
        onPlaybackStatusUpdate={(status) => {
          setStatus(() => status);
        }}
      />
    );
  }

  function backDropContainer() {
    return status.isPlaying ? null : (
      <View
        style={{
          ...styles.video,
          ...styles.backdropVideoStyle,
        }}
      />
    );
  }

  function playButton() {
    return status.isPlaying ? null : (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          status.isPlaying
            ? video.current.pauseAsync()
            : video.current.playAsync()
        }
        style={styles.playPauseButtonStyle}
      >
        <MaterialIcons name="play-arrow" size={30} color={Colors.whiteColor} />
      </TouchableOpacity>
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
  playArrowIconWrapStyle: {
    width: 30.0,
    height: 30.0,
    borderRadius: 15.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
  },
  video: {
    alignSelf: "center",
    width: width,
    height: 280 - StatusBar.currentHeight,
  },
  backdropVideoStyle: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0.0,
    left: 0.0,
    right: 0.0,
  },
  playPauseButtonStyle: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    top: 100.0,
    alignItems: "center",
    justifyContent: "center",
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
  },
  movieImageStyle: {
    height: height * 0.135,
    flex: 1,
    borderRadius: Sizes.fixPadding - 5.0,
    maxWidth: width / 3.6,
  },
});

export default MovieScreen;
