import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet } from "react-native";
import colors from "@/components/colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/CustomTypeWriter";

const StepThree = ({setStep}: { setStep: (step: string) => void }) => {
    return (
        <CustomTypeWriter
            text={"Cool lets begin. Step 1 - Prepare your machine"}
            speed={20}
        >
            <ThemedView style={styles.stepContainer} >
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('4')} />
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

export default StepThree;