import React, { useState } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, View } from 'react-native';

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

interface SliderDimensions {
    width: number,
    left: number,
    right: number,
}

export function CustomSlider() {
    const [sliderDimensions, setSliderDimensions] = useState<SliderDimensions>({
        width: 0,
        left: 0,
        right: 0,
    });

    const translationX = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {translateX: translationX.value},
        ],
    }));

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            console.log('start')
            prevTranslationX.value = translationX.value;
        })
        .onUpdate((event) => {
            const maxTranslateX = sliderDimensions.width / 2;

            translationX.value = clamp(
                prevTranslationX.value + event.translationX,
                -maxTranslateX,
                maxTranslateX
            );
        })
        .runOnJS(true);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View
                style={styles.slider}
                onLayout={(evt) => {
                    const {width, x} = evt.nativeEvent.layout;
                    setSliderDimensions({
                        width: width,
                        left: x,
                        right: x + width,
                    });
                }}>
                <View style={styles.rail}>
                    <GestureDetector gesture={pan}>
                        <Animated.Image
                            source={require('@/assets/images/mug-png.png')}
                            style={[animatedStyles, styles.stepper]}
                        />
                    </GestureDetector>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    slider: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 35,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
    },
    rail: {
        position: 'relative',
        width: '100%',
        height: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#767676',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    stepper: {
        position: 'absolute',
    },
});


// import React, { useRef, useState } from 'react';
// import {
//     Animated, Dimensions,
//     StyleSheet,
//     View
// } from 'react-native';
// import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
// import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
//

//
// function clamp(val:number, min: number, max: number) {
//   return Math.min(Math.max(val, min), max);
// }
//
// const {width, height} = Dimensions.get('screen');
//
//
// export function CustomSlider() {
//     const [sliderDimensions, setSliderDimensions] = useState<SliderDimensions>({
//         height: 0,
//         top: 0,
//         bottom: 0,
//     });
//
//     const translationX = useSharedValue(0);
//     const translationY = useSharedValue(0);
//     const prevTranslationX = useSharedValue(0);
//     const prevTranslationY = useSharedValue(0);
//
//     const animatedStyles = useAnimatedStyle(() => ({
//         transform: [
//             {translateX: translationX.value},
//             {translateY: translationY.value},
//         ],
//     }));
//
//     const pan = Gesture.Pan()
//         .minDistance(0)
//         .onStart(() => {
//             console.log('onStart')
//             prevTranslationX.value = translationX.value;
//             prevTranslationY.value = translationY.value;
//         })
//         .onUpdate((event) => {
//             console.log('onUpdate')
//             const maxTranslateX = width / 2 - 50;
//             const maxTranslateY = height / 2 - 50;
//
//             translationX.value = clamp(
//                 prevTranslationX.value + event.translationX,
//                 -maxTranslateX,
//                 maxTranslateX
//             );
//             translationY.value = clamp(
//                 prevTranslationY.value + event.translationY,
//                 -maxTranslateY,
//                 maxTranslateY
//             );
//         })
//         .runOnJS(true);
//
//     return (
//         <GestureHandlerRootView style={styles.container}>
//             <View
//                 style={styles.slider}
//                 onLayout={(evt) => {
//                     const {height, y} = evt.nativeEvent.layout;
//                     setSliderDimensions({
//                         height: height,
//                         top: y,
//                         bottom: y + height,
//                     });
//                 }}>
//                 <View style={styles.rail}>
//                     <Animated.View style={[styles.railFill]}>
//                         {sliderDimensions.height
//                             ? Array.apply(
//                                 null,
//                                 Array(Math.floor(sliderDimensions.height / 10)),
//                             ).map((item, index) => (
//                                 <View
//                                     key={index}
//                                     style={[styles.railFillSpace, {bottom: index * 10}]}
//                                 />
//                             ))
//                             : null}
//                     </Animated.View>
//                 </View>
//
//                 <GestureDetector gesture={pan}>
//                     <Animated.View style={[animatedStyles, styles.box]}></Animated.View>
//                 </GestureDetector>
//
//             </View>
//         </GestureHandlerRootView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     slider: {
//         width: 50,
//         height: '80%',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         position: 'relative',
//         marginBottom: 50,
//     },
//     rail: {
//         width: 20,
//         height: '100%',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         backgroundColor: '#DBDBDB',
//     },
//     stepper: {
//         width: '100%',
//         height: 5,
//         backgroundColor: 'black',
//     },
//     railFill: {
//         width: '100%',
//         backgroundColor: '#CBAA71',
//         position: 'absolute',
//         bottom: 0,
//     },
//     railFillSpace: {
//         height: 5,
//         width: '100%',
//         backgroundColor: 'white',
//         position: 'absolute',
//     },
//     box: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#b58df1',
//     borderRadius: 20,
//   },
// });