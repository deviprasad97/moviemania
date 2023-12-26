import React from "react";
import { SafeAreaView, View, StatusBar, FlatList, Dimensions, ImageBackground, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

const downloadsList = [
    {
        id: '1',
        image: require('../../assets/images/continueWatching/continueWatching1.png'),
        watchingPercentage: 100,
        movieOrWebSeriesName: 'Squid Game',
        watchingTime: '02:30 h',
        episodes: 9,
        memoryTaken: '1.5GB',
        category: 'Comedy',
        languages: 'English - Hindi',
    },
    {
        id: '2',
        image: require('../../assets/images/popularWebSeries/series2.png'),
        watchingPercentage: 100,
        movieOrWebSeriesName: 'Fate The Winx Saga',
        watchingTime: '03:20 h',
        episodes: 12,
        memoryTaken: '2.2GB',
        category: 'Comedy',
        languages: 'English - Hindi',
    },
    {
        id: '3',
        image: require('../../assets/images/continueWatching/continueWatching3.png'),
        watchingPercentage: 100,
        movieOrWebSeriesName: 'Lucifer',
        watchingTime: '02:30 h',
        episodes: 6,
        memoryTaken: '1.5GB',
        category: 'Comedy',
        languages: 'English - Hindi',
    },
    {
        id: '4',
        image: require('../../assets/images/popularMovies/movie1.png'),
        watchingPercentage: 100,
        movieOrWebSeriesName: 'Red Notice',
        watchingTime: '01:27 h',
        episodes: 4,
        memoryTaken: '1.0GB',
        category: 'Comedy',
        languages: 'English - Hindi',
    },
];

const DownloadsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {downloads()}
            </View>
        </SafeAreaView>
    )

    function downloads() {
        const renderItem = ({ item }) => (
            <View style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                <ImageBackground
                    source={item.image}
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
                        style={{ position: 'absolute', bottom: 0.0, left: 0.0, right: 0.0, }}
                    />
                    <View style={styles.playArrowWrapStyle}>
                        <MaterialIcons
                            name="play-arrow"
                            color={Colors.whiteColor}
                            size={17}
                        />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                        {item.movieOrWebSeriesName}
                    </Text>
                    <Text numberOfLines={2} style={{ marginVertical: Sizes.fixPadding - 5.0, lineHeight: 18.0, ...Fonts.grayColor15Regular }}>
                        {item.watchingTime} | {item.episodes} Episodes | {item.memoryTaken}
                    </Text>
                    <Text numberOfLines={2} style={{ lineHeight: 18.0, ...Fonts.whiteColor15Regular }}>
                        All • {item.category} • {item.languages}
                    </Text>
                </View>
            </View>
        )
        return (
            <FlatList
                data={downloadsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.whiteColor}
                    size={26}
                    onPress={() => navigation.pop()}
                    style={{ marginTop: Sizes.fixPadding - 13.0, }}
                />
                <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor22Bold }}>
                    Downloads
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.blackColor,
    },
    watchingImageStyle: {
        width: width * 0.4,
        height: 100.0,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Sizes.fixPadding,
        overflow: 'hidden',
        borderRadius: Sizes.fixPadding - 5.0,
    },
    playArrowWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DownloadsScreen;
