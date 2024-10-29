import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";
import { Animated, Dimensions, Easing, FlatList, StyleSheet } from "react-native";
import CardView from "@/components/card/card-view";
import React, { PropsWithChildren } from "react";
import SlideBackView from "@/components/anim/slide-back";
import { SafeAreaView } from "react-native-safe-area-context";

const {width} = Dimensions.get('window');

const menuItems = [
    {
        id: "beans",
        title: "BEANS"
    },
    {
        id: "machines",
        title: "MACHINES",
    },
];

type RecipeLandingProps = {
    navForward: (screen: string) => void;
}


export default function RecipeLanding({navForward}: RecipeLandingProps) {

    return (
        <SlideBackView >
            <FlatList
                ListHeaderComponent={
                    <ThemedView >
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
                        <ThemedText >{item.title}</ThemedText >
                    </CardView >
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                horizontal={false}
            />
        </SlideBackView >
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
        backgroundColor: 'transparent',
    },
});