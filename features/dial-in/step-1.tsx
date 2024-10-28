import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet } from "react-native";
import colors from "@/components/colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/CustomTypeWriter";

const StepOne = ({setStep}: { setStep: (step: string) => void }) => {
    return (
        <CustomTypeWriter
            text={"Firstly, I need to know what coffee you are using. You can type below or take a photo and upload the bag."}
            speed={20}
        >
            <ThemedView style={styles.stepContainer} >
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('2')} />
            </ThemedView >
        </CustomTypeWriter >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
});

export default StepOne;