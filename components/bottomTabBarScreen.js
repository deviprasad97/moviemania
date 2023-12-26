import React, { useState, useCallback } from "react";
import { Text, Image, StyleSheet, BackHandler, View } from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import ProfileScreen from "../screens/profile/profileScreen";
import HomeScreen from "../screens/home/homeScreen";
import SearchScreen from "../screens/search/searchScreen";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const BottomTabBarScreen = ({ navigation }) => {
  const backAction = () => {
    backClickCount == 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.blackColor,
            height: 80.0,
            borderTopWidth: 0.0,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              tabBarItem({
                icon: require("../assets/images/icons/home.png"),
                focused,
              }),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              tabBarItem({
                icon: require("../assets/images/icons/search.png"),
                focused,
              }),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              tabBarItem({
                icon: require("../assets/images/icons/user.png"),
                focused,
              }),
          }}
        />
      </Tab.Navigator>
      {exitInfo()}
    </>
  );

  function tabBarItem({ icon, focused }) {
    return (
      <Image
        source={icon}
        style={{
          width: 24.0,
          height: 24.0,
          resizeMode: "contain",
          tintColor: focused ? Colors.primaryColor : Colors.lightGrayColor,
        }}
      />
    );
  }

  function exitInfo() {
    return backClickCount == 1 ? (
      <View style={[styles.animatedView]}>
        <Text style={{ ...Fonts.whiteColor12Regular }}>
          Press Back Once Again to Exit
        </Text>
      </View>
    ) : null;
  }
};

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabBarScreen;
