import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';

const languagesList = ['English (USA)', 'Hindi'];

const downloadOptionsList = ['WiFi Only', 'Mobile Data and WiFi'];

const videoQualitiesList = ['HD (High Definition) 720p', 'Full HD 1080p'];

const SettingsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        showLanguageOptions: false,
        selectedPreferedLanguage: languagesList[0],
        showDownloadOptions: false,
        selectedDownloadOption: downloadOptionsList[0],
        showVideoQualitiesOptions: false,
        selectedVideoQuality: videoQualitiesList[0],
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showLanguageOptions,
        selectedPreferedLanguage,
        showDownloadOptions,
        selectedDownloadOption,
        showVideoQualitiesOptions,
        selectedVideoQuality,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {preferredAppLanguageInfo()}
                {downloadsInfo()}
                {videoQualityInfo()}
            </View>
        </SafeAreaView>
    )

    function videoQualityInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Download Video Quality
                </Text>
                <Menu
                    visible={showVideoQualitiesOptions}
                    style={{ backgroundColor: '#282828' }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showVideoQualitiesOptions: true })}
                            style={styles.settingInfoWrapStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                {selectedVideoQuality}
                            </Text>
                            <Feather name="chevron-down" size={24} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => updateState({ showVideoQualitiesOptions: false })}
                >
                    {
                        videoQualitiesList.map((item, index) => (
                            <MenuItem
                                key={`${index}`}
                                onPress={() => { updateState({ selectedVideoQuality: item, showVideoQualitiesOptions: false }) }}
                                textStyle={{ ...Fonts.whiteColor18Medium }}
                            >
                                {item}
                            </MenuItem>
                        ))
                    }
                </Menu>
                <View style={{ backgroundColor: '#282828', height: 1.0, }} />
            </View>
        )
    }

    function downloadsInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Downloads
                </Text>
                <Menu
                    visible={showDownloadOptions}
                    style={{ backgroundColor: '#282828' }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showDownloadOptions: true })}
                            style={styles.settingInfoWrapStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                {selectedDownloadOption}
                            </Text>
                            <Feather name="chevron-down" size={24} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => updateState({ showDownloadOptions: false })}
                >
                    {
                        downloadOptionsList.map((item, index) => (
                            <MenuItem
                                key={`${index}`}
                                onPress={() => { updateState({ selectedDownloadOption: item, showDownloadOptions: false }) }}
                                textStyle={{ ...Fonts.whiteColor18Medium }}
                            >
                                {item}
                            </MenuItem>
                        ))
                    }
                </Menu>
                <View style={{ backgroundColor: '#282828', height: 1.0, }} />
            </View>
        )
    }

    function preferredAppLanguageInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Preferred App Language
                </Text>
                <Menu
                    visible={showLanguageOptions}
                    style={{ backgroundColor: '#282828' }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showLanguageOptions: true })}
                            style={styles.settingInfoWrapStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Medium }}>
                                {selectedPreferedLanguage}
                            </Text>
                            <Feather name="chevron-down" size={24} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => updateState({ showLanguageOptions: false })}
                >
                    {
                        languagesList.map((item, index) => (
                            <MenuItem
                                key={`${index}`}
                                onPress={() => { updateState({ selectedPreferedLanguage: item, showLanguageOptions: false }) }}
                                textStyle={{ ...Fonts.whiteColor18Medium }}
                            >
                                {item}
                            </MenuItem>
                        ))
                    }
                </Menu>
                <View style={{ backgroundColor: '#282828', height: 1.0, }} />
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
                    Settings
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
    settingInfoWrapStyle: {
        marginTop: Sizes.fixPadding - 8.0,
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default SettingsScreen;