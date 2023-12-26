import React from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';

const subscriptionPlansList = [
    {
        id: '1',
        planeTitle: 'Starter Pack',
        planPeriod: '3 Month',
        planAmount: 10.99,
    },
    {
        id: '2',
        planeTitle: 'Standard Pack',
        planPeriod: '6 Month',
        planAmount: 14.99,
    },
    {
        id: '3',
        planeTitle: 'Super Saver Pack',
        planPeriod: '12 Month',
        planAmount: 24.99,
    }
];

const sunscriptionAllowsList = [
    'Watch all espisodes of every series',
    'Download every contenet available on app',
    'Full HD contenet download option',
    'Any time subscription cancelation facility',
];

const SubscribeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}>
                    {plans()}
                    {subscriptionAllowsInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function subscriptionAllowsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                    Subscriptions allows
                </Text>
                {
                    sunscriptionAllowsList.map((item, index) => (
                        <View
                            key={`${index}`}
                            style={{ marginBottom: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Feather name="check-circle" size={18} color={Colors.primaryColor} />
                            <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.grayColor16Regular }}>
                                {item}
                            </Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    function plans() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, }}>
                {
                    subscriptionPlansList.map((item, index) => (
                        <TouchableOpacity
                            key={`${index}`}
                            activeOpacity={0.9}
                            onPress={() => navigation.push('SubscriptionPayment', { item: item })}
                            style={{ borderRadius: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}
                        >
                            <ImageBackground
                                source={require('../../assets/images/subscribeBg.png')}
                                style={styles.planBackImageStyle}
                                borderRadius={Sizes.fixPadding - 7.0}
                                resizeMode="stretch"
                            >
                                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.whiteColor18Medium }}>
                                    {item.planeTitle}
                                </Text>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                    <Text style={{ ...Fonts.whiteColor22Bold }}>
                                        {item.planPeriod}
                                    </Text>
                                    <Text style={{ ...Fonts.whiteColor20Bold }}>
                                        {`$`}{item.planAmount.toFixed(2)}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))
                }
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
                    Subscribe
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
    planBackImageStyle: {
        height: 112.0,
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding * 3.0,
    }
});

export default SubscribeScreen;
