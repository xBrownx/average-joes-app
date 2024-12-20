import React, { PropsWithChildren, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME_COLOURS } from '@/constants';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export const CollapsableContainer = (
    {
        children,
        expanded,
    }: {
        children: React.ReactNode;
        expanded: boolean;
    }) => {
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const onLayoutHeight = event.nativeEvent.layout.height;

        if (onLayoutHeight > 0 && height !== onLayoutHeight) {
            setHeight(onLayoutHeight);
        }
    };

    const collapsableStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

        return {
            height: animatedHeight.value,
        };
    }, [expanded]);

    return (
        <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
            <View style={{ position: "absolute" }} onLayout={onLayout}>
                {children}
            </View>
        </Animated.View>
    );
};


export function DrawItem({ children, title }: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8} >

                <Text
                    style={styles.headingText}
                >
                    {title}
                </Text >
                <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-down-outline'}
                    size={20}
                    color={THEME_COLOURS.tertiary}
                />
            </TouchableOpacity >

            <CollapsableContainer expanded={isOpen}>
                {children}
            </CollapsableContainer>
        </View >
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderBottomWidth: 1
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        width: '100%',
        justifyContent: 'space-between',

    },
    headingText: {
        color: THEME_COLOURS.tertiary,
        fontFamily: 'PoppinsBold',
        fontSize: 18,
        lineHeight: 20,
        letterSpacing: 0.05,
        marginBottom: -6,
    },
    content: {
        marginTop: 6,
        marginLeft: 24,
    },
});