import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { setUserName, useAppDispatch } from '@/store';
import { ThemedInput } from '@/components/input';
import { TabHeading } from '@/components/tab-heading/tab-heading';
import { ThemedModal, ThemedModalProps } from '@/components/modal';
import { globalStyles } from '@/styles/global-styles';
import { Login } from '@/features/auth/login';


export const AuthModal = ({ isOpen, onClose }: ThemedModalProps) => {

    return (
        <ThemedModal noExit isOpen={isOpen} onClose={onClose} >
            <View style={[globalStyles.innerModal, styles.container]} >
                <ThemedText type={'title'} >
                    WELCOME TO JOE'S!
                </ThemedText >
                <Login />
            </View >
        </ThemedModal >

    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    }
})
