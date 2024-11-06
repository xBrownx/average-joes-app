import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, View } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/CustomTypeWriter";
import { CONSTANTS } from "@/features/dial-in/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FadeUpText } from "@/components/text/fade-up-text";

export function StepThree({onNext, onBack}: { onNext: () => void, onBack: () => void }) {

    return (
        <View >
            <View style={styles.iconWrapper} >
                <Ionicons.Button name="arrow-back" size={32} backgroundColor={'transparent'} color={themedColors.primary}
                                 onPress={onBack} />
            </View >

            <View style={styles.content} >
                <CustomTypeWriter
                    text={CONSTANTS.qThree}
                    textStyle={'title'}
                    speed={20}
                >
                    {CONSTANTS.qThreeSub.map((text, idx) => (
                        <FadeUpText
                            text={text}
                            type={'subtitle'}
                            delay={idx * 500}
                        />
                    ))}

                    <ThemedView style={styles.stepContainer} >
                        <Button title={'Next'} color={themedColors.primary} onPress={onNext} />
                    </ThemedView >

                </CustomTypeWriter >
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    iconWrapper: {
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginTop: 8
    },
});
