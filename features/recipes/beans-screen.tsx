import { StyleSheet, FlatList, Animated, Easing, Dimensions } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import CardView from "@/components/card/card-view";
import React from "react";
import colors from "@/components/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import SlideForwardView from "@/components/anim/slide-forward";
import { SafeAreaView } from "react-native-safe-area-context";

const data = ["MORE BEANS", "GREAT SET OF BEANS"];

type RecipeBeansProps = {
    navBack: () => void;
}

export default function RecipeBeans({navBack}: RecipeBeansProps) {

    return (

        <SlideForwardView >
            <FlatList
                ListHeaderComponent={
                    <ThemedView style={styles.titleContainer} >
                        <Ionicons.Button
                            name="arrow-back"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.primary}
                            onPress={navBack}
                        />
                        <ThemedText type="title" >
                            BEANS
                        </ThemedText >
                    </ThemedView >
                }
                columnWrapperStyle={{gap: 16}}
                contentContainerStyle={{gap: 8}}
                data={data}
                renderItem={({item}) => (
                    <CardView id={""} onPress={() => {
                    }} >
                        <ThemedText >{item}</ThemedText >
                    </CardView >
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
            />
        </SlideForwardView >
    );
}

const styles = StyleSheet.create({

    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
