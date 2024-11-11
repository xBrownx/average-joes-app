import { ThemedText } from "@/components/text/themed-text";
import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { themedColors } from "@/constants/themed-colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { TypeWriterText } from "@/components/typewriter";
import { ThemedCardView } from "@/components/card";

const menuItems = [
    {
        id: 'recipes',
        title: 'RECIPES',
        icon:
            <Ionicons
                name="book-outline"
                size={32}
                backgroundColor={'transparent'}
                color={themedColors.tertiary}
            />,
    },
    {
        id: 'machines',
        title: 'MACHINES',
        icon:
            <Image
                source={require('@/assets/icons/coffee-machine-tertiary.png')}
                style={{ width: 32, height: 32, }}
            />,
    },
    {
        id: 'pantry',
        title: 'PANTRY',
        icon:
            <Image
                source={require('@/assets/icons/pantry-tertiary.png')}
                style={{ width: 32, height: 32, }}
            />,
    },
];

type RecipeLandingProps = {
    navForward: (screen: string) => void;
}


export function KitchenLanding({navForward}: RecipeLandingProps) {
    const focused = useIsFocused();
    return (
        <>{focused &&
        <View style={styles.container}>
            <View style={styles.container} >
                <View style={styles.titleContainer} >
                    <TypeWriterText type={'title'} textArr={["RECIPES"]} />
                </View >
                <View >
                    <ThemedText type="default" >
                        Checkout your recipes, add/edit your machine profiles and keep an eye on what's in your pantry.
                    </ThemedText >
                </View >
            </View >
            {menuItems.map(item => (
                    <ThemedCardView
                        key={item.id}
                        id={item.id}
                        onPress={() => navForward(item.id)}
                        icon={item.icon}
                    >
                        <View style={styles.cardContents} >
                            <ThemedText
                                style={styles.cardText}
                                type={'defaultSemiBold'}
                            >
                                {item.title}
                            </ThemedText >
                            <Ionicons
                                name="arrow-forward"
                                size={32}
                                backgroundColor={'transparent'}
                                color={themedColors.tertiary}
                            />
                        </View >
                    </ThemedCardView >

                ))}
        </View >
        }
        </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flex: 1,
        gap: 16,
        backgroundColor: 'transparent',
        marginBottom: 16,
    },
    cardContents: {
        width: '100%',
        padding: 16,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardText: {
        color: themedColors.tertiary,
        fontSize: 18
    },
});