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
                value={0.52}
                minimumTrackTintColor="#767676"
                maximumTrackTintColor="#767676"
                thumbImage={require('@/assets/images/mug-png.png')}
                trackImage={require('@/assets/images/slider-line.png')}
            />
            <View style={styles.options}>
                <Text style={styles.optionText}>{options[0]}</Text>
                <Text style={styles.optionText}>{options[1]}</Text>
                <Text style={styles.optionText}>{options[2]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 6,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#0C0C0C55',
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF99',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF99',
        paddingBottom: 32,
        paddingHorizontal: 54,
    },
    heading: {
        color: '#FFF',
        fontSize: 25,
        marginTop: 8,

    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    optionText: {
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        flex: 1,
    },
    slider: {
        width: '40%',
        transform: [
            {scaleX: 3.5},
            {scaleY: 3.5},
        ],
        borderRadius: 100,
    },

});