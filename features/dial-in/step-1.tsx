import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, TextInput } from "react-native";
import colors from "@/components/colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/CustomTypeWriter";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectBeans, setCoffeeBeans } from '@/store/dial-in-slice'
import { useSelector } from "react-redux";

const StepOne = ({setStep}: { setStep: (step: string) => void }) => {
    const beans = useAppSelector(selectBeans);
    // const dispatch = useAppDispatch();

    const onTextChange = (text: string) => {
        // dispatch(setCoffeeBeans(text));
    }

    return (
        <CustomTypeWriter
            text={"Firstly, I need to know what coffee you are using. You can type below or take a photo and upload the bag."}
            speed={20}
        >
            <ThemedView style={styles.stepContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onTextChange}
                    placeholder="Enter Me"
                    value={"beans"}
                />
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('2')} />
            </ThemedView>
        </CustomTypeWriter>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
    input: {
        height: 40,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        padding: 10,
    },
});

export default StepOne;