import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownData } from "@/components/dropdown";

type DropdownWithLabelProps = {
    label: string,
    data: DropdownData[],
    value: string,
    onChange: (value: DropdownData) => void,
    isDisabled: number | boolean,
    onAddPress: () => void,
}

export function DropdownWithLabel({label, data, value, onChange, isDisabled, onAddPress}: DropdownWithLabelProps) {
    return (
        <View style={styles.container}>
            <ThemedText>
                {label}:
            </ThemedText>
            <Dropdown
                style={styles.dropdown}
                placeholder={'Tap to add'}
                data={data}
                value={value}
                onChange={onChange}
                labelField={"label"}
                valueField={"label"}
                fontFamily={'Poppins_400Regular, sans-serif'}
                itemTextStyle={{color: 'black'}}
                selectedTextStyle={{color: THEME_COLOURS.tertiary, fontWeight: 'bold'}}
                renderRightIcon={() => (
                    <Ionicons.Button
                        name={isDisabled ? 'chevron-down' : 'add'}
                        size={24} color={THEME_COLOURS.tertiary}
                        style={{marginRight: 8}}
                        backgroundColor={'transparent'}
                        onPress={isDisabled ? undefined : onAddPress}
                        iconStyle={{marginRight: 0}}
                    />
                )}
                disable={!isDisabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    dropdown: {
        backgroundColor: '#FFF',
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: THEME_COLOURS.tertiary,
        fontWeight: 'bold'
    }
})