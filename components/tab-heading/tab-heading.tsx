import { StyleSheet, View } from "react-native";
import TypeWriter from "@/components/text/typewriter-text";

import React from "react";

export function TabHeading({title}: {title: string}) {
    return (
        <View style={styles.titleContainer} >
            <TypeWriter textStyle={'title'} textArr={[title.toUpperCase()]} />
        </View >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'flex-start',
    },
});