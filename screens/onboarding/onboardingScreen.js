import React, { useRef, useState, useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, StyleSheet, Image, Dimensions, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/images/onboarding/onboarding1.png'),
        title: 'Download and Watch Offline',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit In dolor sed posuere pharetra sed felis.`,
    },
    {
        id: '2',
        onboardingImage: require('../../assets/images/onboarding/onboarding2.png'),
        title: 'No Pesky Contracts',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit In dolor sed posuere pharetra sed felis.`,
    },
    {
        id: '3',
        onboardingImage: require('../../assets/images/onboarding/onboarding3.png'),
        title: 'Watch on any Device',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit In dolor sed posuere pharetra sed felis.`,
    },
];

const OnboardingScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;

    const [onboardingScreens, setOnboardingScreen] = useState(onboardingScreenList);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatListRef = useRef();

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Image
                        source={item.onboardingImage}
                        style={{ width: width - 90.0, height: height / 4.5, resizeMode: 'contain' }}
                    />
                    <View style={{ marginTop: Sizes.fixPadding * 4.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        <Text style={{ textAlign: 'center', ...Fonts.whiteColor20Medium }}>
                            {item.title}
                        </Text>
                        <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.whiteColor15Regular }}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <>
                    <Carousel
                        ref={flatListRef}
                        data={onboardingScreens}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        autoplay={true}
                        loop={true}
                        autoplayInterval={4000}
                        slideStyle={{ width: width }}
                    />
                    {pagination()}
                    {skipText()}
                    {forwardArrow()}
                </>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView,]}>
                        <Text style={{ ...Fonts.whiteColor12Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function skipText() {
        return (
            <Text
                onPress={() => navigation.push('Login')}
                style={styles.skipTextStyle}
            >
                Skip
            </Text>
        )
    }

    function forwardArrow() {
        return (
            <View style={styles.forwardArrowOuterWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (activeSlide == 0) {
                            flatListRef.current.snapToItem(1);
                        }
                        else if (activeSlide == 1) {
                            flatListRef.current.snapToItem(2);
                        }
                        else {
                            navigation.push('Login')
                        }
                    }}
                    style={styles.forwardArrowWrapStyle}
                >
                    <MaterialIcons name="arrow-forward" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={onboardingScreens.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationStyle}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.dotStyle}
                inactiveDotScale={1}
            />
        );
    }
}

const styles = StyleSheet.create({
    dotStyle: {
        backgroundColor: Colors.grayColor,
        marginHorizontal: Sizes.fixPadding - 15.0,
        width: 6.0,
        height: 6.0,
        borderRadius: 3,
    },
    activeDotStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: 5.0,
        height: 10.0,
        width: 10.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    forwardArrowOuterWrapStyle: {
        position: 'absolute',
        bottom: 25.0,
        right: 20.0,
    },
    forwardArrowWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding + 3.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    skipTextStyle: {
        ...Fonts.grayColor16SemiBold,
        position: 'absolute',
        right: 20.0,
        top: 20.0,
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        alignSelf: 'center'
    }
});

export default OnboardingScreen;