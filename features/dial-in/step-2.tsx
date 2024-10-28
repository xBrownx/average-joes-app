import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "@/components/colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/CustomTypeWriter";
import { ThemedText } from "@/components/ThemedText";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectPortafilter, setPortafilter } from "@/features/dial-in/store/dial-in-slice";
import { CONSTANTS } from "@/features/dial-in/constants";

const StepTwo = ({setStep}: { setStep: (step: string) => void }) => {
    const portafilter = useAppSelector(selectPortafilter);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = React.useState('')

    const onSelect = () => {
        dispatch(setPortafilter(selected));
        setStep('3')
    }

    return (
        <CustomTypeWriter
            text={CONSTANTS.qTwo}
            speed={20}
        >
            <ThemedView style={styles.stepContainer} >
                {CONSTANTS.portafilterOptions.map(option => {
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
                <Button title={'Next'} color={colors.primary} onPress={onSelect} />
            </ThemedView >
        </CustomTypeWriter >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 0,
        marginBottom: 16,
        marginTop: 16,
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
        backgroundColor: colors.primary,
    },
});

export default StepTwo;