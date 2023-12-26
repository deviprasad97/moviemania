import React from "react";
import { SafeAreaView, View, StatusBar, ScrollView, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const termsOfUseList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit purl Purus justo, lectus consectetur amet aliquet fermentum elit Odio amet habitant.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fer mentum nunc aliquam nullam ultrices. Viverra mi rhoncusnec diam consequat feugiat. Nisi, et vulputate augue faucibus magna tristique.'
];

const companyPoliciesList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit purl Purus justo, lectus consectetur amet aliquet fermentum elit Odio amet habitant.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fer mentum nunc aliquam nullam ultrices. Viverra mi rhoncusnec diam consequat feugiat. Nisi, et vulputate augue faucibus magna tristique.'
];

const TermsAndConditionsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                    {termsOfUseInfo()}
                    {companyPoliciesInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function companyPoliciesInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                    Company Policy
                </Text>
                {
                    companyPoliciesList.map((item, index) =>
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor15Regular, marginBottom: Sizes.fixPadding, }}
                        >
                            {item}
                        </Text>
                    )
                }
            </View>
        )
    }

    function termsOfUseInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.whiteColor20SemiBold }}>
                    Terms of Use
                </Text>
                {
                    termsOfUseList.map((item, index) =>
                        <Text
                            key={`${index}`}
                            style={{ ...Fonts.grayColor15Regular, marginBottom: Sizes.fixPadding, }}
                        >
                            {item}
                        </Text>
                    )
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
                    Terms & Conditions
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
});

export default TermsAndConditionsScreen;
