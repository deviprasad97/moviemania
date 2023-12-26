import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, TouchableOpacity, ScrollView, TextInput, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const SupportScreen = ({ navigation }) => {

    const [state, setState] = useState({
        email: 'samanthasmith@gmail.com',
        message: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        email,
        message,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                    {supportImage()}
                    {inspiringInfo()}
                    {sendMessageInfo()}
                </ScrollView>
            </View>
            {submitButton()}
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.submitButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function sendMessageInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 3.0, ...Fonts.whiteColor20SemiBold }}>
                    Or Send Your Message
                </Text>
                {emailAddressInfo()}
                {messageTextField()}
            </View>
        )
    }

    function messageTextField() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Your Message
                </Text>
                <TextInput
                    value={message}
                    onChangeText={(value) => updateState({ message: value })}
                    placeholder="Write you’re message here"
                    placeholderTextColor={Colors.whiteColor}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function emailAddressInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Email Address
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => updateState({ email: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function inspiringInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    We’re Happy  to Hear From You
                </Text>
                <View style={{ marginVertical: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="phone-call" size={20} color={Colors.grayColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding + 4.0, ...Fonts.grayColor18Regular }}>
                        +91 123654790
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="mail" size={20} color={Colors.grayColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding + 4.0, ...Fonts.grayColor18Regular }}>
                        streamit1234@gmail.com
                    </Text>
                </View>
            </View>
        )
    }

    function supportImage() {
        return (
            <Image
                source={require('../../assets/images/support.png')}
                style={styles.supportImageStyle}
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
                    Support
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
    textFieldStyle: {
        ...Fonts.whiteColor16Medium,
        paddingBottom: Sizes.fixPadding - 3.0,
        borderBottomColor: '#282828',
        borderBottomWidth: 1.0,
    },
    supportImageStyle: {
        height: height / 5.0,
        resizeMode: 'contain',
        margin: Sizes.fixPadding * 2.0,
        alignSelf: 'center',
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
    }
});

export default SupportScreen;
