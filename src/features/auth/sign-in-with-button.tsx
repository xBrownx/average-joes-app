import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SignInButtonProps = {
    title: string;
    icon: React.ReactElement;
    onPress: undefined | (() => void);
}

export function SignInButton({ title, icon, onPress }: SignInButtonProps) {
    return (
        <View >
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container} >
                    <View style={styles.innerContainer}>
                    {icon}
                    <Text style={styles.text} >{title}</Text >
                    </View>
                </View >
            </TouchableOpacity >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',

        paddingVertical: 12,
        borderRadius: 32,
        paddingLeft: '16%',
    },
    innerContainer: {

        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 12,
    },
    text: {
        fontSize: 20,
        lineHeight: 30,
        color: 'grey',
        fontFamily: 'Poppins_400Regular',
        marginBottom: -2,
    },
});