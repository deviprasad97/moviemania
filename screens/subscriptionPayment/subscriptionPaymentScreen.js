import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, Image, ImageBackground, StyleSheet, Text, ScrollView } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const paymentMethodsList = [
    {
        id: '1',
        paymentMethodIcon: require('../../assets/images/paymentMethods/visa.png'),
        paymentMethod: 'Visa Card',
    },
    {
        id: '2',
        paymentMethodIcon: require('../../assets/images/paymentMethods/masterCard.png'),
        paymentMethod: 'Master Card',
    },
    {
        id: '3',
        paymentMethodIcon: require('../../assets/images/paymentMethods/paypal.png'),
        paymentMethod: 'Paypal',
    },
    {
        id: '4',
        paymentMethodIcon: require('../../assets/images/paymentMethods/payU.png'),
        paymentMethod: 'PayU Money',
    },
    {
        id: '5',
        paymentMethodIcon: require('../../assets/images/paymentMethods/stripe.png'),
        paymentMethod: 'Stripe',
    }
];

const SubscriptionPaymentScreen = ({ navigation, route }) => {

    const item = route.params.item;

    const [state, setState] = useState({
        selectedPaymentMethodIndex: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { selectedPaymentMethodIndex, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                    {selectedPlan()}
                    {paymentMethodsInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function paymentMethodsInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                    How’d you like to pay?
                </Text>
                {
                    paymentMethodsList.map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({ selectedPaymentMethodIndex: index })
                                navigation.push('SubscriptionDone')
                            }}
                            key={`${index}`}
                            style={styles.paymentMethodWrapStyle}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={item.paymentMethodIcon}
                                    style={{ width: 45.0, height: 45.0, resizeMode: 'contain' }}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor16Regular }}>
                                    {item.paymentMethod}
                                </Text>
                            </View>
                            <View style={{
                                ...styles.radioButtonStyle,
                                borderColor: selectedPaymentMethodIndex == index ? Colors.primaryColor : Colors.grayColor,
                            }}>
                                {
                                    selectedPaymentMethodIndex == index ?
                                        <View style={{ width: 8.0, height: 8.0, borderRadius: 4.0, backgroundColor: Colors.primaryColor }} />
                                        :
                                        null
                                }
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    function selectedPlan() {
        return (
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
        margin: Sizes.fixPadding * 2.0,
    },
    paymentMethodWrapStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        backgroundColor: '#282828',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 3.0,
        paddingVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    radioButtonStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SubscriptionPaymentScreen;
