import React, { useState, useCallback } from "react";
import { BackHandler, SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar, Image, TextInput, ImageBackground, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {

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
        backClickCount: 0,
        phoneNumber: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        backClickCount,
        phoneNumber,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            <ImageBackground
                source={require('../../assets/images/bgImage.png')}
                style={{ flex: 1, justifyContent: 'space-between', paddingTop: Sizes.fixPadding * 2.0 + StatusBar.currentHeight, }}
                resizeMode="stretch"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
                >
                    {title()}
                    {loginInfo()}
                </ScrollView>
            </ImageBackground>
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

    function title() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.whiteColor22Bold }}>
                Login
            </Text>
        )
    }

    function loginInfo() {
        return (
            <View>
                {phoneNumberInfo()}
                {continueButton()}
                {orContinueWithInfo()}
                {dontAccountInfo()}
            </View>
        )
    }

    function dontAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.whiteColor16Regular }}>
                    Don’t have an account? { }
                </Text>
                <Text
                    onPress={() => navigation.push('Register')}
                    style={{ ...Fonts.primaryColor16Regular }}
                >
                    Register Now
                </Text>
            </Text>
        )
    }

    function orContinueWithInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ textAlign: 'center', ...Fonts.whiteColor15Regular }}>
                    Or Continue with
                </Text>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: '#4267B2',
                        ...styles.googleFacebookButtonStyle,
                        marginRight: Sizes.fixPadding,
                    }}>
                        <Image
                            source={require('../../assets/images/icons/facebook.png')}
                            style={{ width: 24.0, height: 24.0, resizeMode: 'contain', marginRight: Sizes.fixPadding + 5.0, }}
                        />
                        <Text style={{ ...Fonts.whiteColor16Medium }}>
                            Facebook
                        </Text>
                    </View>
                    <View style={{
                        ...styles.googleFacebookButtonStyle,
                        backgroundColor: Colors.whiteColor,
                        marginLeft: Sizes.fixPadding,
                    }}>
                        <Image
                            source={require('../../assets/images/icons/google.png')}
                            style={{ width: 24.0, height: 24.0, resizeMode: 'contain', marginRight: Sizes.fixPadding + 5.0, }}
                        />
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                            Google
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Register')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function phoneNumberInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding * 2.0, ...Fonts.whiteColor20Medium }}>
                    Enter Phone Number to Continue
                </Text>
                <View>
                    <Text style={{ ...Fonts.grayColor15Regular }}>
                        Phone Number
                    </Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={(value) => updateState({ phoneNumber: value })}
                        style={styles.phoneNumberFieldStyle}
                        selectionColor={Colors.primaryColor}
                        keyboardType="phone-pad"
                        placeholder="Enter Phone Number"
                        placeholderTextColor={Colors.whiteColor}
                    />
                </View>
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
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    googleFacebookButtonStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
    },
    phoneNumberFieldStyle: {
        ...Fonts.whiteColor16Medium,
        borderBottomColor: '#949494',
        borderBottomWidth: 1.0,
        paddingBottom: Sizes.fixPadding,
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
    }
});

export default LoginScreen;
