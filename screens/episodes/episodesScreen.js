import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const moreEpisodesList = [
  {
    id: "1",
    episodeImage: require("../../assets/images/episodes/episode1.png"),
    episodeName: "Hell",
    episodeNumber: 2,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "2",
    episodeImage: require("../../assets/images/episodes/episode2.png"),
    episodeName: "The man with the iron heart",
    episodeNumber: 3,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "3",
    episodeImage: require("../../assets/images/episodes/episode3.png"),
    episodeName: "Stick to the Team",
    episodeNumber: 4,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "4",
    episodeImage: require("../../assets/images/episodes/episode4.png"),
    episodeName: "A Fair World",
    episodeNumber: 5,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "5",
    episodeImage: require("../../assets/images/episodes/episode5.png"),
    episodeName: "Gganbu",
    episodeNumber: 6,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "6",
    episodeImage: require("../../assets/images/episodes/episode6.png"),
    episodeName: "VIPs",
    episodeNumber: 7,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "7",
    episodeImage: require("../../assets/images/episodes/episode7.png"),
    episodeName: "Front Man",
    episodeNumber: 8,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
  {
    id: "8",
    episodeImage: require("../../assets/images/episodes/episode8.png"),
    episodeName: "One Lucky Day",
    episodeNumber: 9,
    episodeDescription:
      "Lorem ipsum dolor sit amet, consectetur adipscing elit. Vitae ac, eros platea elit mi, vel consectetur congue neque.",
  },
];

const EpisodesScreen = ({ navigation }) => {
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
          videoUrl={{
            uri: "https://immrri:QR3hGLg7hqdQchj@immrri.calgary.usbx.me/downloads/deluge/Captain.America.The.First.Avenger.2011.UHD.BluRay.2160p.TrueHD.Atmos.7.1.DV.HEVC.HYBRID.REMUX-FraMeSToR.mkv",
          }}
          videoStatus={isPlay}
        />
        {backArrow()}
        <FlatList
          ListHeaderComponent={
            <>
              {episodeInfo()}
              {moreEpisodesInfo()}
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );

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

  function moreEpisodesInfo() {
    const renderItem = ({ item }) => (
      <View
        style={{
          marginBottom: Sizes.fixPadding * 2.0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ImageBackground
          source={item.episodeImage}
          style={styles.episodeImageStyle}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <View style={styles.playArrowIconWrapStyle}>
            <MaterialIcons
              name="play-arrow"
              color={Colors.whiteColor}
              size={20}
            />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ flex: 1, ...Fonts.whiteColor16Regular }}
            >
              Episode {item.episodeNumber} : {item.episodeName}
            </Text>
            <Feather name="download" size={20} color={Colors.whiteColor} />
          </View>
          <Text
            numberOfLines={3}
            style={{
              marginTop: Sizes.fixPadding - 5.0,
              lineHeight: 16.0,
              ...Fonts.whiteColor12Regular,
            }}
          >
            {item.episodeDescription}
          </Text>
        </View>
      </View>
    );
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginBottom: Sizes.fixPadding,
            ...Fonts.whiteColor20SemiBold,
          }}
        >
          More Episodes
        </Text>
        <FlatList
          data={moreEpisodesList}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    );
  }

  function episodeInfo() {
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
            Episode 1 : Red Light, Green Light
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
        isLooping
        shouldPlay={videoStatus}
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
  episodeImageStyle: {
    width: width * 0.34,
    height: height * 0.12,
    alignItems: "center",
    justifyContent: "center",
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
});

export default EpisodesScreen;
