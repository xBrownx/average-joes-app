import { StyleSheet, FlatList, Animated, Easing, Dimensions } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { ThemedView } from '@/components/ThemedView';
import CardView from "@/components/card/card-view";
import React, { useLayoutEffect, useState } from "react";
import colors from "@/components/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDataString } from "@/util/local-storage";

type RecipeBeansProps = {
    navBack: () => void;
}

export default function RecipeBeans({navBack}: RecipeBeansProps) {
    const [beans, setBeans] = useState<string[]>([]);

    const onLoadMachineName = () => {
        getDataString("machine-name").then((machineName) => {
            console.log(machineName);
        })
    }

    return (

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
            data={beans}
            renderItem={({item}) => (
                <CardView id={""} onPress={onLoadMachineName} >
                    <ThemedText >{item}</ThemedText >
                </CardView >
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
        />
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
