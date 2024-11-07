import { Button, StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React, { useEffect } from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/CustomTypeWriter";
import { CONSTANTS } from "@/features/dial-in/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FadeUpText } from "@/components/text/fade-up-text";
import { ThemedText } from "@/components/text/themed-text";
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";

export function StepFour({onNext, onBack}: { onNext: () => void, onBack: () => void }) {

    const opacity = React.useState(new Animated.Value(0))[0];
    const [show, setShow] = React.useState(false);

    function onShow() {
        setShow(true);
    }

    function fadeInNext() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            delay: 1500,
        }).start()
    }

    useEffect(() => setShow(false), []);

    return (
        <View >
            <DialInHeading onBack={onBack} onShow={onShow} icon={'back'} />
            <View style={styles.container}>
                <CustomTypeWriter
                    text={["The Process"]}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                <CustomTypeWriter
                    text={CONSTANTS.process}
                    type={'default'}
                    speed={20}
                    onComplete={fadeInNext}
                    isShow={show}
                >
                    <View style={styles.content}>
                        {CONSTANTS.processSteps.map((text, idx) => (
                            <FadeUpText
                                key={idx}
                                text={text}
                                type={'default'}
                                delay={idx * 500}
                            />
                        ))}

                    </View>
                </CustomTypeWriter>
                <Animated.View
                    style={[{opacity}, styles.buttonWrapper]}
                >
                    <Button title={'Next'} color={themedColors.primary} onPress={onNext} />
                </Animated.View>
                </CustomTypeWriter>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: themedColors.background,
    },
    content: {
        flex: 1,
        gap: 4,
        marginTop: 8,
        overflow: 'hidden',
    },
    buttonWrapper: {
        marginTop: 16,
    },
});
