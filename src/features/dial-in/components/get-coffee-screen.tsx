import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/CustomTypeWriter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectBeans, setCoffeeBeans } from '@/store/slice/dial-in-slice'
import { useSelector } from "react-redux";
import { CONSTANTS } from "@/features/dial-in/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";

export function GetCoffeeScreen({onNext, onBack}: { onNext: () => void, onBack: () => void }) {
    const beans = useAppSelector(selectBeans);
    const dispatch = useAppDispatch();
    const [show, setShow] = React.useState(false);
    const onTextChange = (text: string) => {
        dispatch(setCoffeeBeans(text));
    }

    function onShow() {
        setShow(true);
    }

    return (
        <View>
            <DialInHeading onBack={onBack} onShow={onShow} icon={'exit'} />
            <View style={styles.content}>
                <CustomTypeWriter
                    text={CONSTANTS.qOne}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                    <ThemedView style={styles.stepContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onTextChange}
                            placeholder="Enter Me"
                            value={beans}
                        />
                        <Button title={'Next'} color={themedColors.primary} onPress={onNext} />
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
        paddingHorizontal: 32,
        paddingVertical: 16,
        gap: 16,
        overflow: 'hidden',
    },
});
