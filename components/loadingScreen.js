import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Mukta_Regular: require("../assets/fonts/Mukta/Mukta-Regular.ttf"),
                Mukta_Medium: require("../assets/fonts/Mukta/Mukta-Medium.ttf"),
                Mukta_SemiBold: require("../assets/fonts/Mukta/Mukta-SemiBold.ttf"),
                Mukta_Bold: require("../assets/fonts/Mukta/Mukta-Bold.ttf"),
                Mukta_ExtraBold: require("../assets/fonts/Mukta/Mukta-ExtraBold.ttf"),
                Mukta_ExtraLight: require("../assets/fonts/Mukta/Mukta-ExtraLight.ttf"),
                Mukta_Light: require("../assets/fonts/Mukta/Mukta-Light.ttf"),
                BebasNeue_Regular: require("../assets/fonts/BebasNeue/BebasNeue-Regular.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;