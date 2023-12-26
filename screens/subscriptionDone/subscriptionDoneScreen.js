import React, { useCallback } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const SubscriptionDoneScreen = ({ navigation }) => {

    const backAction = () => {
        navigation.push('BottomTabBar');
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {congratsInfo()}
                {findYourShowButton()}
            </View>
        </SafeAreaView>
    )

    function congratsInfo() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/subscriptionDone.png')}
                    style={styles.subscriptionDoneImageStyle}
                />
                <Text style={{ ...Fonts.whiteColor22Medium }}>
                    Congratulations !!
                </Text>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.whiteColor18Regular }}>
                    You’re Subscribed User Now
                </Text>
            </View>
        )
    }

    function findYourShowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.findYourShowButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Find Your Show
                </Text>
            </TouchableOpacity>
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
    findYourShowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    subscriptionDoneImageStyle: {
        width: '100%',
        height: height / 3.0,
        resizeMode: 'contain',
        marginBottom: Sizes.fixPadding * 3.0,
    }
});

export default SubscriptionDoneScreen;
