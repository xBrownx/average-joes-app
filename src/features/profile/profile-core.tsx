import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { Button, StyleSheet, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { TypeWriterText } from "@/components/typewriter";
import { themedColors } from "@/constants/themed-colors";

import { getAuth } from 'firebase/auth';
import { collection } from "@firebase/firestore";
import { db } from "@/config/firebase";

export function ProfileCore() {
    const isFocused = useIsFocused();

    function signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const myCollection = collection(db, 'users');


    return (
        <>
            {isFocused &&
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <TypeWriterText type={'title'} textArr={["PROFILE"]} />
                    </View>
                    <Button
                        title={'LOGOUT'}
                        color={themedColors.primary}
                        onPress={signOut}
                    />
                </View>
            }
        </>

    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 0,
        marginBottom: 2,
    },
});