import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import LoadingScreen from "./components/loadingScreen";
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import WatchlistScreen from "./components/releaseInfo";
import webSeriesDetailScreen from "./screens/webSeriesDetail/webSeriesDetailScreen";
import episodesScreen from "./screens/episodes/episodesScreen";
import popularOnStreamitScreen from "./screens/popularOnStreamit/popularOnStreamitScreen";
import movieDetailScreen from "./screens/movieDetail/movieDetailScreen";
import movieScreen from "./screens/movie/movieScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import notificationScreen from "./screens/notification/notificationScreen";
import watchlistScreen from "./screens/watchlist/watchlistScreen";
import downloadsScreen from "./screens/downloads/downloadsScreen";
import subscribeScreen from "./screens/subscribe/subscribeScreen";
import subscriptionPaymentScreen from "./screens/subscriptionPayment/subscriptionPaymentScreen";
import subscriptionDoneScreen from "./screens/subscriptionDone/subscriptionDoneScreen";
import settingsScreen from "./screens/settings/settingsScreen";
import termsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import supportScreen from "./screens/support/supportScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
import verificationScreen from "./screens/auth/verificationScreen";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen
          name="Splash"
          component={splashScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="Onboarding" component={onboardingScreen} />
        <Stack.Screen
          name="Login"
          component={loginScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="Verification" component={verificationScreen} />
        <Stack.Screen
          name="BottomTabBar"
          component={BottomTabBarScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name="WebSeriesDetail"
          component={webSeriesDetailScreen}
        />
        <Stack.Screen name="Episodes" component={episodesScreen} />
        <Stack.Screen
          name="PopularOnStreamit"
          component={popularOnStreamitScreen}
        />
        <Stack.Screen name="MovieDetail" component={movieDetailScreen} />
        <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} />
        <Stack.Screen name="Movie" component={movieScreen} />
        <Stack.Screen name="EditProfile" component={editProfileScreen} />
        <Stack.Screen name="Notification" component={notificationScreen} />
        <Stack.Screen name="Watchlist" component={watchlistScreen} />
        <Stack.Screen name="Downloads" component={downloadsScreen} />
        <Stack.Screen name="Subscribe" component={subscribeScreen} />
        <Stack.Screen
          name="SubscriptionPayment"
          component={subscriptionPaymentScreen}
        />
        <Stack.Screen
          name="SubscriptionDone"
          component={subscriptionDoneScreen}
        />
        <Stack.Screen name="Settings" component={settingsScreen} />
        <Stack.Screen
          name="TermsAndConditions"
          component={termsAndConditionsScreen}
        />
        <Stack.Screen name="Support" component={supportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
