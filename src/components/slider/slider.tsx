import React, { useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

interface SliderDimensions {
    height: number,
    top: number,
    bottom: number,
}

export function CustomSlider() {
    const [sliderDimensions, setSliderDimensions] = useState<SliderDimensions>({
        height: 0,
        top: 0,
        bottom: 0,
    });

    const stepperAnim = useRef<any>(new Animated.Value(0)).current;

    const stepperResponder = Gesture.Pan()
        .onUpdate((evt) => {
            const {y} = evt;
            stepperAnim.setValue(y);
        })
        .runOnJS(true);


    return (
        <GestureHandlerRootView>
        <GestureDetector gesture={stepperResponder}>
            <View
                style={styles.slider}
                onLayout={(evt) => {
                    const {height, y} = evt.nativeEvent.layout;
                    setSliderDimensions({
                        height: height,
                        top: y,
                        bottom: y + height,
                    });
                }}>
                <View style={styles.rail}>
                    <Animated.View style={[styles.railFill]}>
                        {sliderDimensions.height
                            ? Array.apply(
                                null,
                                Array(Math.floor(sliderDimensions.height / 10)),
                            ).map((item, index) => (
                                <View
                                    key={index}
                                    style={[styles.railFillSpace, {bottom: index * 10}]}
                                />
                            ))
                            : null}
                    </Animated.View>
                </View>
                <Animated.View
                    style={[
                        styles.stepper,
                        {
                            transform: [{translateY: stepperAnim}],
                        },
                    ]}
                />
            </View>
        </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    slider: {
        width: 50,
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        marginBottom: 50,
    },
    rail: {
        width: 20,
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#DBDBDB',
    },
    stepper: {
        width: '100%',
        height: 5,
        backgroundColor: 'black',
    },
    railFill: {
        width: '100%',
        backgroundColor: '#CBAA71',
        position: 'absolute',
        bottom: 0,
    },
    railFillSpace: {
        height: 5,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
    },
});