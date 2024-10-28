import TypeWriter from "@/components/TypeWriter";
import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "@/components/colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/CustomTypeWriter";
import { ThemedText } from "@/components/ThemedText";

const StepTwo = ({setStep}: { setStep: (step: string) => void }) => {
    const [selected, setSelected] = React.useState('')
    const options: string[] = ['51mm', '54mm', '58mm']

    return (
        <CustomTypeWriter
            text={"Okay great. Next, what type of portafilter does your machine have?"}
            speed={20}
        >
            <ThemedView style={styles.stepContainer} >
                {options.map(option => {
                    return (
                        <TouchableOpacity
                            key={option}
                            style={styles.singleOptionContainer}
                            onPress={() => setSelected(option)}>
                            <View style={styles.outerCircle}>
                                {selected === option ? (
                                    <View style={styles.innerCircle} />
                                ) : null}
                            </View>
                            <ThemedText>{option}</ThemedText>
                        </TouchableOpacity>
                    );
                })}
            </ThemedView>
            <ThemedView style={styles.stepContainer} >
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('3')} />
            </ThemedView >
        </CustomTypeWriter >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionContainer: {
        width: '90%',
    },
    singleOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        margin: 5,
    },
    outerCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: 'blue',
    },
});

export default StepTwo;