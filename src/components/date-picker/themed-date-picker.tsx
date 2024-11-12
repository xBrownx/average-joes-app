import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

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

    const [date, setDate] = useState<Date | undefined>(new Date(1598051730000));

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode: 'date' | 'time') => {
        DateTimePickerAndroid.open({
            value: date?? new Date(Date.now()),
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <SafeAreaView >
            <Pressable >
                <TextInput
                    focusable={false}
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onPress={showDatepicker}
                />
            </Pressable >
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