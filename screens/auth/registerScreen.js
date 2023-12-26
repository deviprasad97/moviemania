import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, StatusBar, TextInput, ImageBackground, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
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
                    {registerInfo()}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )

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
                    Register
                </Text>
            </View>

        )
    }

    function registerInfo() {
        return (
            <View>
                {fullNameInfo()}
                {emailAddressInfo()}
                {phoneNumberInfo()}
                {continueButton()}
                {alreadyAccountInfo()}
            </View>
        )
    }

    function emailAddressInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                    placeholder="Enter Email Address"
                    placeholderTextColor={Colors.whiteColor}
                />
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Full Name
                </Text>
                <TextInput
                    value={name}
                    onChangeText={(value) => updateState({ name: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    placeholder="Enter Full Name"
                    placeholderTextColor={Colors.whiteColor}
                />
            </View>
        )
    }

    function alreadyAccountInfo() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center' }}>
                <Text style={{ ...Fonts.whiteColor16Regular }}>
                    Already have an account? { }
                </Text>
                <Text
                    onPress={() => navigation.push('Login')}
                    style={{ ...Fonts.primaryColor16Regular }}
                >
                    Login Now
                </Text>
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Verification')}
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
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Phone Number
                </Text>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(value) => updateState({ phoneNumber: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                    placeholder="Enter Phone Number"
                    placeholderTextColor={Colors.whiteColor}
                />
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
    textFieldStyle: {
        ...Fonts.whiteColor16Medium,
        borderBottomColor: '#949494',
        borderBottomWidth: 1.0,
        paddingBottom: Sizes.fixPadding,
    }
});

export default RegisterScreen;