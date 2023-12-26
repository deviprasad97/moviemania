import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Animated, TouchableHighlight, ImageBackground, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from "react-native-paper";

const movieWatchlist = [
    {
        key: '1',
        movieImage: require('../../assets/images/popular/popular10.png'),
        movieName: 'See You Yesterday',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 10,
        memoryTaken: '1.5GB',
    },
    {
        key: '2',
        movieImage: require('../../assets/images/popularMovies/movie7.png'),
        movieName: 'Dhamaka',
        movieCategories: 'Action, Drama',
        movieLanguages: 'English, Hindi',
        episodes: 12,
        memoryTaken: '2GB',
    },
    {
        key: '3',
        movieImage: require('../../assets/images/popular/popular14.png'),
        movieName: 'Unbelievable',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 8,
        memoryTaken: '1.5GB',
    },
    {
        key: '4',
        movieImage: require('../../assets/images/popular/popular15.png'),
        movieName: 'I am not okay with this',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 12,
        memoryTaken: '1.2GB',
    },
    {
        key: '5',
        movieImage: require('../../assets/images/popular/popular13.png'),
        movieName: 'Let The Battles Begin',
        movieCategories: 'Comedy, Drama, Action',
        movieLanguages: 'English',
        episodes: 9,
        memoryTaken: '1.5GB',
    },
    {
        key: '6',
        movieImage: require('../../assets/images/popular/popular11.png'),
        movieName: 'House of Cards',
        movieCategories: 'Action, Drama, Mystery',
        movieLanguages: 'English, Hindi',
        episodes: 4,
        memoryTaken: '2.2GB',
    },
    {
        key: '7',
        movieImage: require('../../assets/images/popular/popular9.png'),
        movieName: 'Rapture',
        movieCategories: 'Comedy, Drama, Adventure',
        movieLanguages: 'English, Hindi',
        episodes: 10,
        memoryTaken: '1.5GB',
    },
    {
        key: '8',
        movieImage: require('../../assets/images/popular/popular8.png'),
        movieName: 'In The Shadow of The Moon',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 9,
        memoryTaken: '1.2GB',
    },
    {
        key: '9',
        movieImage: require('../../assets/images/popularMovies/movie8.png'),
        movieName: 'Big Bang Theory',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 12,
        memoryTaken: '1.5GB',
    },
    {
        key: '10',
        movieImage: require('../../assets/images/popularMovies/movie9.png'),
        movieName: 'Stranger Things',
        movieCategories: 'Action, Drama',
        movieLanguages: 'English, Hindi',
        episodes: 10,
        memoryTaken: '2GB',
    },
];

const tvShowWatchlist = [
    {
        key: '3',
        movieImage: require('../../assets/images/popular/popular14.png'),
        movieName: 'Unbelievable',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 8,
        memoryTaken: '1.5GB',
    },
    {
        key: '4',
        movieImage: require('../../assets/images/popular/popular15.png'),
        movieName: 'I am not okay with this',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 12,
        memoryTaken: '1.2GB',
    },
    {
        key: '5',
        movieImage: require('../../assets/images/popular/popular13.png'),
        movieName: 'Let The Battles Begin',
        movieCategories: 'Comedy, Drama, Action',
        movieLanguages: 'English',
        episodes: 9,
        memoryTaken: '1.5GB',
    },
    {
        key: '6',
        movieImage: require('../../assets/images/popular/popular11.png'),
        movieName: 'House of Cards',
        movieCategories: 'Action, Drama, Mystery',
        movieLanguages: 'English, Hindi',
        episodes: 4,
        memoryTaken: '2.2GB',
    },
    {
        key: '7',
        movieImage: require('../../assets/images/popular/popular9.png'),
        movieName: 'Rapture',
        movieCategories: 'Comedy, Drama, Adventure',
        movieLanguages: 'English, Hindi',
        episodes: 10,
        memoryTaken: '1.5GB',
    },
    {
        key: '8',
        movieImage: require('../../assets/images/popular/popular8.png'),
        movieName: 'In The Shadow of The Moon',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 9,
        memoryTaken: '1.2GB',
    },
    {
        key: '9',
        movieImage: require('../../assets/images/popularMovies/movie8.png'),
        movieName: 'Big Bang Theory',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 12,
        memoryTaken: '1.5GB',
    },
    {
        key: '10',
        movieImage: require('../../assets/images/popularMovies/movie9.png'),
        movieName: 'Stranger Things',
        movieCategories: 'Action, Drama',
        movieLanguages: 'English, Hindi',
        episodes: 10,
        memoryTaken: '2GB',
    },
];

const webseriesWatchlist = [
    {
        key: '1',
        movieImage: require('../../assets/images/popular/popular10.png'),
        movieName: 'See You Yesterday',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 10,
        memoryTaken: '1.5GB',
    },
    {
        key: '2',
        movieImage: require('../../assets/images/popularMovies/movie7.png'),
        movieName: 'Dhamaka',
        movieCategories: 'Action, Drama',
        movieLanguages: 'English, Hindi',
        episodes: 12,
        memoryTaken: '2GB',
    },
    {
        key: '3',
        movieImage: require('../../assets/images/popular/popular14.png'),
        movieName: 'Unbelievable',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 8,
        memoryTaken: '1.5GB',
    },
    {
        key: '4',
        movieImage: require('../../assets/images/popular/popular15.png'),
        movieName: 'I am not okay with this',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 12,
        memoryTaken: '1.2GB',
    },
    {
        key: '5',
        movieImage: require('../../assets/images/popular/popular13.png'),
        movieName: 'Let The Battles Begin',
        movieCategories: 'Comedy, Drama, Action',
        movieLanguages: 'English',
        episodes: 9,
        memoryTaken: '1.5GB',
    },
    {
        key: '6',
        movieImage: require('../../assets/images/popular/popular11.png'),
        movieName: 'House of Cards',
        movieCategories: 'Action, Drama, Mystery',
        movieLanguages: 'English, Hindi',
        episodes: 4,
        memoryTaken: '2.2GB',
    },
    {
        key: '7',
        movieImage: require('../../assets/images/popular/popular9.png'),
        movieName: 'Rapture',
        movieCategories: 'Comedy, Drama, Adventure',
        movieLanguages: 'English, Hindi',
        episodes: 10,
        memoryTaken: '1.5GB',
    },
    {
        key: '8',
        movieImage: require('../../assets/images/popular/popular8.png'),
        movieName: 'In The Shadow of The Moon',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 9,
        memoryTaken: '1.2GB',
    },
    {
        key: '9',
        movieImage: require('../../assets/images/popularMovies/movie8.png'),
        movieName: 'Big Bang Theory',
        movieCategories: 'Comedy, Drama',
        movieLanguages: 'English',
        episodes: 12,
        memoryTaken: '1.5GB',
    },
    {
        key: '10',
        movieImage: require('../../assets/images/popularMovies/movie9.png'),
        movieName: 'Stranger Things',
        movieCategories: 'Action, Drama',
        movieLanguages: 'English, Hindi',
        episodes: 10,
        memoryTaken: '2GB',
    },
];

const WatchlistScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedTabIndex: 0,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { selectedTabIndex, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {watchlistTypeTab()}
                {
                    selectedTabIndex == 0
                        ?
                        <MovieWatchlist data={movieWatchlist} />
                        :
                        selectedTabIndex == 1
                            ?
                            <TvShowWatchlist data={tvShowWatchlist} />
                            :
                            <WebSeriesWatchlist data={webseriesWatchlist} />
                }
            </View>
        </SafeAreaView>
    )

    function watchlistTypeTab() {
        return (
            <View style={styles.watchlistTypeTabWrapStyle}>
                {watchlistOptionsSort({ index: 0, option: 'Movies' })}
                {watchlistOptionsSort({ index: 1, option: 'TV Shows' })}
                {watchlistOptionsSort({ index: 2, option: 'Web Series' })}
            </View>
        )
    }

    function watchlistOptionsSort({ index, option }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedTabIndex: index })}
                style={{ flex: 1, alignItems: 'center' }}
            >
                <Text numberOfLines={1} style={{ marginBottom: Sizes.fixPadding - 2.0, ...selectedTabIndex == index ? { ...Fonts.primaryColor18Medium } : { ...Fonts.grayColor18Medium } }}>
                    {option}
                </Text>
                <View style={{ width: '100%', backgroundColor: selectedTabIndex == index ? Colors.primaryColor : Colors.blackColor, height: 2.0, }} />
            </TouchableOpacity>
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
                    Watchlist
                </Text>
            </View>
        )
    }

}

const rowSwipeAnimatedValues = {};

Array(tvShowWatchlist.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

Array(webseriesWatchlist.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

Array(movieWatchlist.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const MovieWatchlist = ({ data }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(data);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.bodyBackColor }}
            activeOpacity={0.9}
        >
            <View style={styles.watchlistInfoWrapStyle}>
                <ImageBackground
                    source={data.item.movieImage}
                    style={styles.imageStyle}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderBottomLeftRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.playArrowIconWrapStyle}>
                        <MaterialIcons
                            name="play-arrow"
                            color={Colors.whiteColor}
                            size={18}
                        />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding, marginRight: Sizes.fixPadding - 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Medium }}>
                        {data.item.movieName}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
                        {data.item.movieCategories}
                    </Text>
                    <Text style={{ lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
                        {data.item.movieLanguages}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 18.0, flex: 1, ...Fonts.whiteColor14Regular }}>
                            {data.item.episodes} Episodes | size - {data.item.memoryTaken}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="download" size={16} color={Colors.primaryColor} />
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.primaryColor15Medium }}>
                                Download
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 60],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                listData.length == 0 ?
                    noItemsInfo()
                    :
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-70}
                            onSwipeValueChange={onSwipeValueChange}
                            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                        />
                    </View>
            }
            <Snackbar
                style={styles.snackBarStyle}
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Feather name="bookmark" size={30} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                    No items in watchlist
                </Text>
            </View>
        )
    }
}

const TvShowWatchlist = ({ data }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(data);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.bodyBackColor }}
            activeOpacity={0.9}
        >
            <View style={styles.watchlistInfoWrapStyle}>
                <ImageBackground
                    source={data.item.movieImage}
                    style={styles.imageStyle}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderBottomLeftRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.playArrowIconWrapStyle}>
                        <MaterialIcons
                            name="play-arrow"
                            color={Colors.whiteColor}
                            size={18}
                        />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding, marginRight: Sizes.fixPadding - 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Medium }}>
                        {data.item.movieName}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
                        {data.item.movieCategories}
                    </Text>
                    <Text style={{ lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
                        {data.item.movieLanguages}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 18.0, flex: 1, ...Fonts.whiteColor14Regular }}>
                            {data.item.episodes} Episodes | size - {data.item.memoryTaken}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="download" size={16} color={Colors.primaryColor} />
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.primaryColor15Medium }}>
                                Download
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 60],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                listData.length == 0 ?
                    noItemsInfo()
                    :
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-70}
                            onSwipeValueChange={onSwipeValueChange}
                            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                        />
                    </View>
            }
            <Snackbar
                style={styles.snackBarStyle}
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Feather name="bookmark" size={30} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                    No items in watchlist
                </Text>
            </View>
        )
    }
}

const WebSeriesWatchlist = ({ data }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(data);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.bodyBackColor }}
            activeOpacity={0.9}
        >
            <View style={styles.watchlistInfoWrapStyle}>
                <ImageBackground
                    source={data.item.movieImage}
                    style={styles.imageStyle}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderBottomLeftRadius={Sizes.fixPadding - 5.0}
                >
                    <View style={styles.playArrowIconWrapStyle}>
                        <MaterialIcons
                            name="play-arrow"
                            color={Colors.whiteColor}
                            size={18}
                        />
                    </View>
                </ImageBackground>
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding, marginRight: Sizes.fixPadding - 5.0, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Medium }}>
                        {data.item.movieName}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
                        {data.item.movieCategories}
                    </Text>
                    <Text style={{ lineHeight: 20.0, ...Fonts.grayColor16Regular }}>
                        {data.item.movieLanguages}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 5.0, lineHeight: 18.0, flex: 1, ...Fonts.whiteColor14Regular }}>
                            {data.item.episodes} Episodes | size - {data.item.memoryTaken}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="download" size={16} color={Colors.primaryColor} />
                            <Text style={{ marginLeft: Sizes.fixPadding - 7.0, ...Fonts.primaryColor15Medium }}>
                                Download
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 60],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                listData.length == 0 ?
                    noItemsInfo()
                    :
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-70}
                            onSwipeValueChange={onSwipeValueChange}
                            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                        />
                    </View>
            }
            <Snackbar
                style={styles.snackBarStyle}
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Feather name="bookmark" size={30} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                    No items in watchlist
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.blackColor,
    },
    watchlistTypeTabWrapStyle: {
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.blackColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 20,
        justifyContent: 'center',
        position: 'absolute',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 100.0,
        height: 120.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    watchlistInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282828',
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    }
});

export default WatchlistScreen;