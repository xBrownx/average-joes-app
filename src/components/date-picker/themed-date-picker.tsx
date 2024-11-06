import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { themedColors } from "@/constants/themed-colors";
import { dateObjToString } from "@/usecase/date-usecase";

type ThemedDatePickerProps = {
    placeholder: string;
    value: string;
    onValueChange: (date: Date) => void;
}

export function ThemedDatePicker({placeholder, value, onValueChange}: ThemedDatePickerProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        onValueChange(date);
        hideDatePicker();
    };


    return (
        <SafeAreaView >
            <Pressable >
                <TextInput
                    focusable={false}
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onPress={showDatePicker}
                />
            </Pressable >
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}

                accentColor={themedColors.primary}
            />

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    'input': {
        height: 50,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        paddingLeft: 8,
        paddingTop: 4,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: 'Poppins',
        justifyContent: 'center',
        alignItems: 'center',
    },
})