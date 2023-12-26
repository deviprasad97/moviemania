import React, { useCallback } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Text,
  BackHandler,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  setTimeout(() => {
    navigation.push("BottomTabBar");
  }, 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 50.0, height: 50.0, resizeMode: "contain" }}
        />
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            letterSpacing: 5.0,
            ...Fonts.primaryColor30BebasRegular,
          }}
        >
          STREAMIT
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
