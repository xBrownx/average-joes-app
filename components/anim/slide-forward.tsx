import { Animated, Dimensions, Easing, ViewProps } from "react-native";
import React from "react";
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
    });

    const translateX = value.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0],
    });

    const opacity = value

    return (
        <Animated.View style={[{opacity, transform: [{translateX}]}]} {...otherProps} />
    );

}
