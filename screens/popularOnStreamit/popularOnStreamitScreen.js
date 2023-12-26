import React from "react";
import { SafeAreaView, View, StatusBar, TouchableOpacity, FlatList, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const popularOnAppList = [
    {
        id: '1',
        image: require('../../assets/images/popular/popular18.png')
    },
    {
        id: '2',
        image: require('../../assets/images/popular/popular1.png')
    },
    {
        id: '3',
        image: require('../../assets/images/popularWebSeries/series5.png')
    },
    {
        id: '4',
        image: require('../../assets/images/popularWebSeries/series4.png')
    },
    {
        id: '5',
        image: require('../../assets/images/popular/popular2.png')
    },
    {
        id: '6',
        image: require('../../assets/images/popular/popular3.png')
    },
    {
        id: '7',
        image: require('../../assets/images/popular/popular4.png')
    },
    {
        id: '8',
        image: require('../../assets/images/popular/popular5.png')
    },
    {
        id: '9',
        image: require('../../assets/images/popular/popular6.png')
    },
    {
        id: '10',
        image: require('../../assets/images/popular/popular7.png')
    },
    {
        id: '11',
        image: require('../../assets/images/popular/popular18.png')
    },
    {
        id: '12',
        image: require('../../assets/images/popular/popular19.png')
    },
    {
        id: '13',
        image: require('../../assets/images/popular/popular20.png')
    },
    {
        id: '14',
        image: require('../../assets/images/popular/popular21.png')
    },
    {
        id: '15',
        image: require('../../assets/images/popular/popular22.png')
    },
    {
        id: '16',
        image: require('../../assets/images/popular/popular8.png')
    },
    {
        id: '17',
        image: require('../../assets/images/popular/popular9.png')
    },
    {
        id: '18',
        image: require('../../assets/images/popular/popular10.png')
    },
    {
        id: '19',
        image: require('../../assets/images/popular/popular11.png')
    },
    {
        id: '20',
        image: require('../../assets/images/popular/popular12.png')
    },
    {
        id: '21',
        image: require('../../assets/images/popular/popular13.png')
    },
    {
        id: '22',
        image: require('../../assets/images/popular/popular14.png')
    },
    {
        id: '23',
        image: require('../../assets/images/popular/popular15.png')
    },
    {
        id: '24',
        image: require('../../assets/images/popular/popular17.png')
    },
    {
        id: '25',
        image: require('../../assets/images/popular/popular16.png')
    },
];

const PopularOnStreamitScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {popularOnApp()}
            </View>
        </SafeAreaView>
    )

    function popularOnApp() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('WebSeriesDetail')}
            >
                <Image
                    source={item.image}
                    style={styles.popularOnAppImageStyle}
                />
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={popularOnAppList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                numColumns={3}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding + 5.0, paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding }}
            />
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
                    Popular on Streamit
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
    popularOnAppImageStyle: {
        flex: 1,
        height: 140.0,
        marginHorizontal: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 7.0,
        maxWidth: width / 3.6,
        resizeMode: 'stretch'
    }
});

export default PopularOnStreamitScreen;
