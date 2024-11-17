import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Appearance, Dimensions, LayoutAnimation } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { themedColors } from "@/constants/themed-colors";

const TAB_WIDTH = 100;

type TabProps = {
    tabs: string[],
    contents: React.ReactNode[],
};

export const AnimatedTabs: React.FC<TabProps> = ({tabs, contents}) => {
    const [activeTab, setActiveTab] = useState(0);
    const activeIndex = useSharedValue(0);
    const [width, setWidth] = React.useState(0);

    const onTabPress = (index: number) => {
        setActiveTab(index);
        activeIndex.value = withTiming(index, {duration: 300});
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: activeIndex.value * (width/3) }],
        };
    });


    return (
        <Animated.View
            style={styles.wrapper}
            onLayout={event => setWidth(event.nativeEvent.layout.width)}
            layout={LinearTransition}
        >
            <View style={styles.container}>
                <Animated.View style={[styles.highlight, animatedStyle, {width: (width / 3) - 20}]} />
                <View style={[styles.tabsContainer, {width: TAB_WIDTH * tabs.length}]}>
                    {tabs.map((tab, index) => (
                        <TouchableOpacity key={index} onPress={() => onTabPress(index)} style={styles.tab}>
                            <Text style={activeTab === index ? styles.activeTabText : styles.tabText}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <Animated.View style={styles.content} layout={LinearTransition}>
                {/*{contents[activeTab]}*/}
                {contents.map((content, idx) => {
                    return (
                        <View key={idx}>{activeTab === idx && content}</View>
                    )
                })}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: themedColors.tertiary,
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    container: {
        position: 'relative',
        height: 50,
        flexDirection: 'row',
        backgroundColor: themedColors.backgroundSecondary,
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',


    },
    tabsContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    tabText: {
        color: themedColors.tertiary,
        fontSize: 16,
    },
    activeTabText: {
        color: themedColors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    highlight: {
        position: 'absolute',
        flex: 1,
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        right: 10,
        left: 10,
    },
    content: {
        marginTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    }
});