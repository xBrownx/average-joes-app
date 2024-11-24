import React, { useEffect, useState } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { Button, StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import auth from '@react-native-firebase/auth';
import { TypeWriterText } from "@/components/typewriter";
import { themedColors } from "@/constants/themed-colors";
import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from "@/config/firebase";
import { ThemedText } from '@/components/text/themed-text';


export function ProfileCore() {
    const isFocused = useIsFocused();
    const myAuth = auth();
    const user = myAuth.currentUser;
    const [userData, setUserData] = React.useState<any>([]);

    function signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const userCollection = collection(db, 'users');

    const fetchUsers = async () => {
        if (user) {
            const q = query(userCollection, where("userId", "==", user.uid));
            const data = await getDocs(q);
            const userD = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setUserData(userD[0]);
        } else {
            console.log("No user logged in");
        }
    }
    const addUser = async () => {
        if (user) {
            await addDoc(userCollection, {joeBucks: 0, userId: user.uid});
            await fetchUsers();
        } else {
            console.log("No user logged in");
        }
    }

    const updateUser = async (id: string) => {
        const userDoc = doc(db, 'users', id);
        await updateDoc(userDoc, {joeBucks: userData.joeBucks + 10});
        fetchUsers();
    }

    const deleteUser = async () => {
    }

    useEffect(() => {
        fetchUsers();
    }, [user])

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
                    <Button
                        title={'CREATE USER'}
                        color={themedColors.primary}
                        onPress={addUser}
                    />
                    <Button
                        title={'ADD JOE BUCKS'}
                        color={themedColors.primary}
                        onPress={() => updateUser(userData.id)}
                    />
                    <ThemedText>
                        Joe Bucks: {userData.joeBucks}
                    </ThemedText>
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