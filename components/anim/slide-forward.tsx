import { Animated, Dimensions, Easing, ViewProps } from "react-native";
import React, { useState } from "react";

const {width} = Dimensions.get('window');

export default function SlideForwardView({...otherProps}: ViewProps) {
    const value = new Animated.Value(0);

    React.useEffect(() => {
        Animated.sequence([
            Animated.timing(value, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
            })
        ]).start()
    },);

    const translateX = value.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0],
    });

    const opacity = value

    return (
        <Animated.View style={[{opacity, transform: [{translateX}]}]} {...otherProps} />
    );
}

export function SlideView({visible, isParent, ...otherProps}: ViewProps & { visible: boolean, isParent: boolean }) {
    const animatedValue = new Animated.Value(0);
    const [xTrans, setXTrans] = useState([0, width])

    const startTransition = () => {
        animatedValue.resetAnimation()
        Animated.sequence([
            Animated.timing(animatedValue, {
                useNativeDriver: true,
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
            })
        ]).start()
    }

    const setAnimationParams = () => {
        if(isParent && visible) {
            setXTrans([-width, 0]);
        } else if(visible) {
            setXTrans([0, width]);
        } else if(isParent) {
            setXTrans([width, 0]);
        } else {
            setXTrans([-width, 0]);
        }
    }

    React.useEffect(() => {
        setAnimationParams();
        startTransition();
    }, [visible]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: xTrans,
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: visible ? [0, 1] : [1, 0],
    })


    return (
        <Animated.View style={[{transform: [{translateX}]}]} {...otherProps} />
    );
}

