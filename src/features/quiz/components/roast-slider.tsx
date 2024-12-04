import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

type RoastSliderProps = {
    heading: string;
    options: string[];
}

export function RoastSlider({heading, options}: RoastSliderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                {heading.toUpperCase()}
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#767676"
                maximumTrackTintColor="#767676"
                thumbImage={require('@/assets/images/mug-png.png')}
                trackImage={require('@/assets/images/slider-line.png')}
            />
            <View style={styles.options}>
                <Text>{options[0]}</Text>
                <Text>{options[1]}</Text>
                <Text>{options[2]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 2,
        gap: 54,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#0C0C0C55',
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF99',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF99',
    },
    heading: {
        color: '#FFF',
        fontSize: 25,
        marginTop: 8,

    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    slider: {
        width: '33%',
        transform: [
            {scaleX: 3.5},
            {scaleY: 3.5}
        ],
        borderRadius: 100,
    },

});