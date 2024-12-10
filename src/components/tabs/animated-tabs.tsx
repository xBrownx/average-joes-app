import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { THEME_COLOURS } from "@/constants/theme-colors";
import { useCustomState } from '@/hooks';

interface AnimatedTabState {
    activeTab?: number;
    tabWidth?: number;
}

type TabProps = {
    tabs: string[],
    contents: React.ReactNode[],
};

export const AnimatedTabs: React.FC<TabProps> = ({tabs, contents}) => {
    const {state, updateState} = useCustomState<AnimatedTabState>({
        activeTab: -1,
        tabWidth: 0,
    })
    const activeIndex = useSharedValue(0);

    const onTabPress = (index: number) => {
        updateState({activeTab: index});
        activeIndex.value = withTiming(index, {duration: 300});
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: activeIndex.value * (state.tabWidth! / 3)
            }],
        };
    });


    return (
        <Animated.View
            style={styles.wrapper}
            onLayout={event => updateState({tabWidth: event.nativeEvent.layout.width})}
            layout={LinearTransition}
        >
            <View style={styles.container}>
                {state.activeTab! >= 0 &&
                    <Animated.View
                        style={[
                            styles.highlight,
                            animatedStyle,
                            {width: (state.tabWidth! / 3) - 20}
                        ]}
                    />
                }
                <View
                    style={[
                        styles.tabsContainer,
                        {width: state.tabWidth! * tabs.length}
                    ]}
                >
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onTabPress(index)}
                            style={styles.tab}
                        >
                            <Text
                                style={state.activeTab === index
                                    ? styles.activeTabText
                                    : styles.tabText}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {state.activeTab! >= 0 &&
                <Animated.View
                    style={styles.content}
                    layout={LinearTransition}
                >
                    {contents.map((content, idx) => {
                        return (
                            <View
                                key={idx}
                            >
                                {state.activeTab === idx && content}
                            </View>
                        )
                    })}
                </Animated.View>
            }
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
        borderColor: THEME_COLOURS.tertiary,
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 10,
        overflow: 'hidden',
    },
    container: {
        position: 'relative',
        height: 50,
        flexDirection: 'row',
        backgroundColor: THEME_COLOURS.backgroundSecondary,
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
        color: THEME_COLOURS.tertiary,
        fontSize: 16,
    },
    activeTabText: {
        color: THEME_COLOURS.primary,
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