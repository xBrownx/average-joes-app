import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, TextInput, View } from "react-native";
import colors from "@/components/colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/CustomTypeWriter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectBeans, setCoffeeBeans } from '@/store/slice/dial-in-slice'
import { useSelector } from "react-redux";
import { CONSTANTS } from "@/features/dial-in/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const StepOne = ({setStep}: { setStep: (step: string) => void }) => {
    const beans = useAppSelector(selectBeans);
    const dispatch = useAppDispatch();

    const onTextChange = (text: string) => {
        dispatch(setCoffeeBeans(text));
    }

    const navigateBack = () => {
        setStep('0')
    }

    return (
        <View >
            <View style={styles.iconWrapper}>
                <Ionicons.Button name="close" size={32} backgroundColor={'transparent'} color={colors.primary} onPress={navigateBack} />
            </View>

            <View style={styles.content}>
        <CustomTypeWriter
            text={CONSTANTS.qOne}
            textStyle={'title'}
            speed={20}
        >
            <ThemedView style={styles.stepContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onTextChange}
                    placeholder="Enter Me"
                    value={beans}
                />
                <Button title={'Next'} color={colors.primary} onPress={() => setStep('2')} />
            </ThemedView>
        </CustomTypeWriter>
            </View>
        </View>
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
    iconWrapper: {
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginTop: 8
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});

export default StepOne;