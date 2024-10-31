import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";
import { Animated, Dimensions, Easing, FlatList, Image, StyleSheet, View } from "react-native";
import CardView from "@/components/card/card-view";
import React, { PropsWithChildren, useEffect } from "react";
import SlideBackView from "@/components/anim/slide-back";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/components/colors";

const {width} = Dimensions.get('window');

const menuItems = [
    {
        id: "beans",
        title: "BEANS",
        img: require('@/assets/images/beans_2.png'),
    },
    {
        id: "machines",
        title: "MACHINES",
        img: require('@/assets/images/machines_2.png'),
    },
];

type RecipeLandingProps = {
    navForward: (screen: string) => void;
}


export default function RecipeLanding({navForward}: RecipeLandingProps) {

    return (
        <FlatList
            ListHeaderComponent={
                <ThemedView style={styles.container} >
                    <ThemedView style={styles.titleContainer} >
                        <ThemedText type="title" >RECIPES</ThemedText >
                    </ThemedView >
                    <ThemedView >
                        <ThemedText type="default" >Checkout your saved beans or add/edit your machine
                            profiles.</ThemedText >
                    </ThemedView >
                </ThemedView >
            }
            columnWrapperStyle={{gap: 16}}
            contentContainerStyle={{gap: 8}}
            data={menuItems}
            renderItem={({item}) => (
                <CardView id={item.id} onPress={() => navForward(item.id)} >

                        <Image
                            source={item.img}
                            style={styles.cardImage}
                        />
                        <ThemedText style={styles.cardText} type={'defaultSemiBold'}>{item.title}</ThemedText >

                </CardView >
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
        />
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flex: 1,
        gap: 16,
        backgroundColor: 'transparent',
        marginBottom: 16,
    },
    cardContents: {
        width: '100%',
        padding: 0,
        margin: 0,
        flex: 1,
    },
    cardImage: {
        flex: 1,
        width: 'auto',
        objectFit: 'contain',
    },
    cardText: {
        alignSelf: "center",
        color: colors.tertiary
    },
});