import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, FlatList, Dimensions, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import { Overlay } from "@rneui/themed";

const { width } = Dimensions.get('window');

const premiumBenifitsList = [
    {
        id: '1',
        benifitBgImage: require('../../assets/images/benifitBg/benifitBg1.png'),
        benifit: `Get Access to\nAll Full HD\nContents`,
    },
    {
        id: '2',
        benifitBgImage: require('../../assets/images/benifitBg/benifitBg2.png'),
        benifit: `Enable\nDownload Movies`,
    },
    {
        id: '3',
        benifitBgImage: require('../../assets/images/benifitBg/benifitBg3.png'),
        benifit: `Watch\nPremium Contents`,
    },
];

const ProfileScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showLogoutDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { showLogoutDialog, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 1, }}>
                        <ScrollView>
                            {userInfo()}
                            {profileOptions()}
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0 }}>
                        {premiumBenifitsInfo()}
                        {upgradeToPremiumButton()}
                    </View>
                </View>
            </View>
            {logoutDialog()}
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Overlay
                isVisible={showLogoutDialog}
                onBackdropPress={() => { updateState({ showLogoutDialog: false }) }}
                overlayStyle={{ padding: 0.0, width: '80%', borderRadius: Sizes.fixPadding - 5.0, }}
            >
                <View style={{ backgroundColor: '#282828', borderRadius: Sizes.fixPadding - 5.0, }}>
                    <View style={styles.logoutTitleWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                            Logout
                        </Text>
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding + 3.0 }}>
                        <Text style={{ ...Fonts.whiteColor16Regular }}>
                            Are you sure you want to logout?
                        </Text>
                        <Text style={{ ...Fonts.whiteColor16Regular }}>
                            This action will clear your downloads and wishlist!
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
                            <Text
                                onPress={() => updateState({ showLogoutDialog: false })}
                                style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.primaryColor18Bold }}
                            >
                                Cancel
                            </Text>
                            <Text
                                onPress={() => {
                                    updateState({ showLogoutDialog: false })
                                    navigation.push('Login')
                                }}
                                style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.primaryColor18Bold }}
                            >
                                Logout
                            </Text>
                        </View>
                    </View>
                </View>
            </Overlay>
        )
    }

    function upgradeToPremiumButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Subscribe')}
                style={styles.upgradeToPremiumButtonStyle}
            >
                <Image
                    source={require('../../assets/images/icons/crownWithColor.png')}
                    style={{ width: 20.0, height: 20.0, resizeMode: 'contain', }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding * 2.0, ...Fonts.whiteColor18Bold }}>
                    Upgrade to Premium
                </Text>
            </TouchableOpacity>
        )
    }

    function premiumBenifitsInfo() {
        const renderItem = ({ item }) => (
            <ImageBackground
                source={item.benifitBgImage}
                style={{ height: 100.0, width: width - 100.0, marginRight: Sizes.fixPadding, }}
                borderRadius={Sizes.fixPadding - 5.0}
            >
                <View style={styles.benifitBgImageShadowStyle}>
                    <Text style={{ ...Fonts.whiteColor18SemiBold }}>
                        {item.benifit}
                    </Text>
                </View>
            </ImageBackground>
        )
        return (
            <View>
                <FlatList
                    data={premiumBenifitsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingRight: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function profileOptions() {
        return (
            <View style={{ marginTop: Sizes.fixPadding }}>
                {profileOptionsSort({ iconName: 'user', option: 'My Profile', navigateTo: 'EditProfile' })}
                {profileOptionsSort({ iconName: 'bookmark', option: 'Watchlist', navigateTo: 'Watchlist' })}
                {profileOptionsSort({ iconName: 'download', option: 'Downloads', navigateTo: 'Downloads' })}
                {profileOptionsSort({ iconName: 'settings', option: 'Settings', navigateTo: 'Settings' })}
                {profileOptionsSort({ iconName: 'file-text', option: 'Terms & Conditions', navigateTo: 'TermsAndConditions' })}
                {profileOptionsSort({ iconName: 'help-circle', option: 'Support', navigateTo: 'Support' })}
            </View>
        )
    }

    function profileOptionsSort({ iconName, option, navigateTo }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push(navigateTo)}
                style={{ ...styles.profileOptionsWrapStyle }}
            >
                <Feather name={iconName} size={20} color={Colors.grayColor} style={{ marginRight: Sizes.fixPadding * 2.0, }} />
                <Text style={{ ...Fonts.grayColor18Medium }}>
                    {option}
                </Text>
            </TouchableOpacity>
        )
    }

    function userInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                <Image
                    source={require('../../assets/images/users/user6.png')}
                    style={styles.profileImageStyle}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding * 2.0, }}>
                    <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                        Samantha Smith
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../assets/images/icons/crown.png')}
                                style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor15Regular }}>
                                Non-Premium
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor22Bold }}>
                    Profile
                </Text>
                <Text
                    onPress={() => updateState({ showLogoutDialog: true })}
                    style={{ ...Fonts.primaryColor16SemiBold }}
                >
                    Logout
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.blackColor,
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileImageStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        backgroundColor: Colors.primaryColor
    },
    upgradeToPremiumButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        margin: Sizes.fixPadding * 2.0,
    },
    benifitBgImageShadowStyle: {
        paddingHorizontal: Sizes.fixPadding,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    profileOptionsWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    logoutDialogStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 40,
        padding: 0.0,
    },
    logoutTitleWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 3.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0,
    }
});

export default ProfileScreen;