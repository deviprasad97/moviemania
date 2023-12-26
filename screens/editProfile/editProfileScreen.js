import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, StatusBar, Image, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';

const EditProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showBottomSheet: false,
        name: 'Samantha Smith',
        email: 'samanthasmith@gmail.com',
        phoneNumber: '+91 1236547890',
        password: '12345678912'
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showBottomSheet,
        name,
        email,
        phoneNumber,
        password,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePic()}
                    {fullNameInfo()}
                    {emailAddressInfo()}
                    {phoneNumberInfo()}
                    {passwordInfo()}
                </ScrollView>
            </View>
            {saveButton()}
            {changeProfilePicOptionsSheet()}
        </SafeAreaView>
    )

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.saveButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Password
                </Text>
                <TextInput
                    value={password}
                    onChangeText={(value) => updateState({ password: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    secureTextEntry={true}
                />
            </View>
        )
    }

    function phoneNumberInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Phone Number
                </Text>
                <TextInput
                    value={phoneNumber}
                    onChangeText={(value) => updateState({ phoneNumber: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                    keyboardType="phone-pad"
                />
            </View>
        )
    }

    function emailAddressInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
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

    function fullNameInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor15Regular }}>
                    Full Name
                </Text>
                <TextInput
                    value={name}
                    onChangeText={(value) => updateState({ name: value })}
                    style={styles.textFieldStyle}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showBottomSheet: false }) }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.changeProfilePicBottomSheetStyle}
                >
                    <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                        Choose Option
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding + 5.0, flexDirection: 'row', }}>
                        {changeProfilePicOptionsSort({
                            bgColor: '#009688',
                            icon: <Entypo name="camera" size={22} color={Colors.whiteColor} />,
                            option: 'Camera'
                        })}
                        <View style={{ marginHorizontal: Sizes.fixPadding * 3.0, }}>
                            {changeProfilePicOptionsSort({
                                bgColor: '#00A7F7',
                                icon: <MaterialCommunityIcons name="image" size={24} color={Colors.whiteColor} />,
                                option: 'Gallery'
                            })}
                        </View>
                        {changeProfilePicOptionsSort({
                            bgColor: '#DD5A5A',
                            icon: <Feather name="trash-2" size={24} color={Colors.whiteColor} />,
                            option: `Remove\nphoto`
                        })}
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function changeProfilePicOptionsSort({ bgColor, icon, option }) {
        return (
            <View>
                <View style={{
                    ...styles.changeProfilePicOptionsIconWrapStyle,
                    backgroundColor: bgColor,
                }}>
                    {icon}
                </View>
                <Text style={{ textAlign: 'center', marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Regular }}>
                    {option}
                </Text>
            </View>
        )
    }

    function profilePic() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'center', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/images/users/user6.png')}
                    style={styles.userImageStyle}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: true })}
                    style={styles.changePhotoIconWrapStyle}
                >
                    <MaterialIcons name="photo-camera" size={17} color={Colors.primaryColor} />
                </TouchableOpacity>
            </View>
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
                    Edit Profile
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
    userImageStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 50.0,
        backgroundColor: Colors.primaryColor,
    },
    changePhotoIconWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0.0,
        right: 0.0,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: '#282828',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    changeProfilePicOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldStyle: {
        ...Fonts.whiteColor16Medium,
        borderBottomColor: Colors.grayColor,
        borderBottomWidth: 1.0,
        paddingBottom: Sizes.fixPadding,
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
    }
});

export default EditProfileScreen;
