import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar, TextInput, ImageBackground, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { CircleFade } from 'react-native-animated-spinkit';
import { Overlay } from "@rneui/themed";

const VerificationScreen = ({ navigation }) => {

    const [state, setState] = useState({
        verificationCode: null,
        isLoading: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        verificationCode,
        isLoading,
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
                    {verificationInfo()}
                </ScrollView>
                {loadingDialog()}
            </ImageBackground>
        </SafeAreaView>
    )

    function loadingDialog() {
        return (
            <Overlay
                isVisible={isLoading}
                overlayStyle={{ padding: 0.0, width: '80%', borderRadius: Sizes.fixPadding - 5.0 }}
            >
                <View style={styles.dialogWrapStyle}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor15Regular,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait...
                    </Text>
                </View>
            </Overlay>
        );
    }

    function title() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.whiteColor}
                    size={26}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor22Bold }}>
                    Verification
                </Text>
            </View>
        )
    }

    function verificationInfo() {
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.whiteColor20Medium }}>
                    Almost Logged in !
                </Text>
                <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.whiteColor16Regular }}>
                    Enter 4 digit verification code. We just sent you
                    on +91 12365474690
                </Text>
                {verificationCodeTextField()}
                {continueButton()}
            </View>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ isLoading: true })
                    setTimeout(() => {
                        updateState({ isLoading: false })
                        navigation.push('BottomTabBar')
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function verificationCodeTextField() {
        return (
            <TextInput
                value={verificationCode}
                onChangeText={(value) => updateState({ verificationCode: value })}
                placeholder="Enter Verification Code"
                placeholderTextColor={Colors.grayColor}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                keyboardType="numeric"
            />
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
    textFieldStyle: {
        ...Fonts.whiteColor16Medium,
        borderBottomColor: '#949494',
        borderBottomWidth: 1.0,
        paddingBottom: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0
    },
    dialogWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        borderRadius: Sizes.fixPadding - 5.0
    },
});

export default VerificationScreen;