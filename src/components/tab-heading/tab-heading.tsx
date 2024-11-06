import { StyleSheet, View } from "react-native";
import { TypeWriterText } from "@/components/typewriter/typewriter-text";

import React from "react";

export function TabHeading({title}: {title: string}) {
    return (
        <View style={styles.titleContainer} >
            <TypeWriterText textStyle={'title'} textArr={[title.toUpperCase()]} />
        </View >
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'flex-start',
    },
});