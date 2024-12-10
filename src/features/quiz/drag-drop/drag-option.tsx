import React, { useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, Animated as RNAnimated } from 'react-native';
import { DragData, useDragDropContext } from "@/features/quiz/drag-drop/context";
import { ThemedText } from "@/components/text";

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

export function DragOption({data}: { data: DragData }) {
    const {pos, onDragStart, onDragEnd, selection, checkSelection } = useDragDropContext();
    const [isSelected, setSelected] = React.useState(false);
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {translateX: translationX.value},
            {translateY: translationY.value},
        ],
    }));

    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            onDragStart(data);
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((evt) => {
            const {absoluteX, absoluteY} = evt;
            pos.x.setValue(absoluteX);
            pos.y.setValue(absoluteY);

            translationX.value = prevTranslationX.value + evt.translationX;
            translationY.value = prevTranslationY.value + evt.translationY;

        })
        .onEnd(() => {
            translationX.value = 0;
            translationY.value = 0;
            const convert = (value: RNAnimated.Value) => Number(JSON.stringify(value));
            onDragEnd({x: convert(pos.x), y: convert(pos.y)});
        })
        .runOnJS(true);

    useEffect(() => {
        console.log('selection change')
        setSelected(checkSelection(data.id));
    }, [selection]);

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[
                animatedStyles,
                styles.box,
                isSelected ? {
                    opacity: 0,
                } : {
                    opacity: 1,
                }
            ]}>
                <ThemedText
                    type={'defaultSemiBold'}
                    style={styles.optionText}
                >
                    {data.text}
                </ThemedText>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    box: {
        height: 33,
        width: 133,
        backgroundColor: '#EBD4B2',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFF',
    },
    optionText: {
        fontSize: 13,
    },
});

// import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
// import { Animated, Dimensions, StyleSheet, View } from "react-native";
// import { DragData, useDragDropContext } from "@/features/quiz/drag-drop/context";
// import { ThemedText } from "@/components/text";
// import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
// import { useState } from "react";
//
// function clamp(val: number, min: number, max: number) {
//     return Math.min(Math.max(val, min), max);
// }
//
// const {width, height} = Dimensions.get('screen');
//
// interface Bounds {
//     width: number;
//     height: number;
// }
//
// export function DragOption({data}: { data: DragData }) {
//     // const {pos, onDragStart, onDragEnd} = useDragDropContext();
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
//     // const pan = Gesture.Pan()
//     //     .minDistance(1)
//     //     .onStart(() => {
//     //         onDragStart(data);
//     //         prevTranslationX.value = translationX.value;
//     //         prevTranslationY.value = translationY.value;
//     //
//     //         console.log('prevTranslationX.value', prevTranslationX.value);
//     //         console.log('prevTranslationY.value', prevTranslationY.value);
//     //         console.log('translationX.value', translationX.value);
//     //         console.log('translationY.value', translationY.value);
//     //         console.log('start')
//     //     })
//     //     .onUpdate((evt) => {
//     //         const {absoluteX, absoluteY} = evt;
//     //         pos.x.setValue(absoluteX);
//     //         pos.y.setValue(absoluteY);
//     //
//     //         const maxTranslateX = width / 2;
//     //         const maxTranslateY = height / 2;
//     //
//     //         translationX.value = evt.translationX;
//     //         translationY.value = prevTranslationY.value + evt.translationY;
//     //
//     //         console.log('translationX', clamp(
//     //             prevTranslationX.value + evt.translationX,
//     //             -maxTranslateX,
//     //             maxTranslateX
//     //         ));
//     //         console.log('translationY', clamp(
//     //             prevTranslationY.value + evt.translationY,
//     //             -maxTranslateY,
//     //             maxTranslateY
//     //         ));
//     //
//     //     })
//     //     // .onEnd(() => {
//     //     //     const convert = (value: Animated.Value) => Number(JSON.stringify(value));
//     //     //     onDragEnd({x: convert(pos.x), y: convert(pos.y)});
//     //     //     translationX.value = 0;
//     //     //     translationY.value = 0;
//     //     // })
//     //     .runOnJS(true);
//
//     const pan = Gesture.Pan()
//         .minDistance(1)
//         .onStart(() => {
//             prevTranslationX.value = translationX.value;
//             prevTranslationY.value = translationY.value;
//         })
//         .onUpdate((event) => {
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
//             <GestureDetector gesture={pan}>
//                 <Animated.View style={[animatedStyles, styles.box]}></Animated.View>
//                 {/*<Animated.View*/}
//                 {/*    style={[*/}
//                 {/*        animatedStyles,*/}
//                 {/*        styles.optionContainer,*/}
//                 {/*    ]}*/}
//                 {/*>*/}
//                 {/*    <ThemedText*/}
//                 {/*        type={'defaultSemiBold'}*/}
//                 {/*        style={styles.optionText}*/}
//                 {/*    >*/}
//                 {/*        {data.text}*/}
//                 {/*    </ThemedText>*/}
//                 {/*</Animated.View>*/}
//             </GestureDetector>
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
//     innerContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginLeft: 'auto',
//         marginRight: 'auto',
//         position: 'relative',
//     },
//     optionContainer: {
//         position: 'absolute',
//         backgroundColor: '#EBD4B2',
//         height: 33,
//         width: 133,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: 1,
//         borderColor: '#FFF',
//         borderRadius: 4,
//         zIndex: 10,
//     },
//     optionText: {
//         fontSize: 13,
//     },
//     box: {
//         zIndex: 10,
//         width: 100,
//         height: 100,
//         backgroundColor: '#b58df1',
//         borderRadius: 20,
//     },
// });