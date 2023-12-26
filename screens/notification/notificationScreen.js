import React, { useState, useRef } from "react";
import { SafeAreaView, Animated, View, Dimensions, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const { width } = Dimensions.get('window');

const notificationList = [
    {
        key: '1',
        title: 'Upgrade premium now',
        description: 'Lorem ipsum dolor sit amet, consectetur Ipsun adipiscing elit. Ipsum, placerat nunc.',
        time: 'Today',
    },
    {
        key: '2',
        title: 'You haven’t watched The Crown.',
        description: 'Lorem ipsum dolor sit amet, consectetur Ipsun adipiscing elit. Ipsum, placerat nunc.',
        time: 'Today',
    },
    {
        key: '3',
        title: 'Watch now new trending movies',
        description: 'Lorem ipsum dolor sit amet, consectetur Ipsun adipiscing elit. Ipsum, placerat nunc.',
        time: 'Today',
    }
];

const rowTranslateAnimatedValues = {};

const NotificationScreen = ({ navigation }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if ((value < -width || value > width) && !animationIsRunning.current) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.notificationIconWrapStyle}>
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color={Colors.whiteColor}
                            />
                        </View>
                        <View style={{ marginLeft: Sizes.fixPadding * 2.0, flex: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text numberOfLines={1} style={{ ...Fonts.whiteColor18Medium }}>
                                    {data.item.title}
                                </Text>
                                <Text style={{ ...Fonts.grayColor12Regular }}>
                                    {data.item.time}
                                </Text>
                            </View>
                            <Text numberOfLines={2} style={{ ...Fonts.grayColor15Regular }}>
                                {data.item.description}
                            </Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: data.index == listData.length - 1 ? 'transparent' : '#282828', height: 1.0, marginVertical: Sizes.fixPadding * 2.0 }} />
                </View>
            </View>
        </Animated.View>
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ backgroundColor: Colors.bodyBackColor, flex: 1, }}>
                    {listData.length == 0 ?
                        noNotificatiosInfo()
                        :
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-width}
                            leftOpenValue={width}
                            onSwipeValueChange={onSwipeValueChange}
                            useNativeDriver={false}
                            contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
                        />
                    }
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={showSnackBar}
                        onDismiss={() => setShowSnackBar(false)}
                    >
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            {snackBarMsg}
                        </Text>
                    </Snackbar>
                </View>
            </View>
        </SafeAreaView>
    );

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
                    Notification
                </Text>
            </View>
        )
    }

    function noNotificatiosInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Ionicons name="notifications-off-outline" size={30} color={Colors.grayColor} />
                <Text style={{ ...Fonts.grayColor18Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                    No new notification
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
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding * 3.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333'
    },
    notificationIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default NotificationScreen;
