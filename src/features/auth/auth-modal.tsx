import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import React from 'react';
import { setUserName, useAppDispatch } from '@/store';
import { ThemedInput } from '@/components/input';
import { TabHeading } from '@/components/tab-heading/tab-heading';
import { ThemedModal } from '@/components/modal';
import { globalStyles } from '@/styles/global-styles';
import { Login } from "@/features/auth/login";

type AuthModalProps = {
    isOpen: boolean;
    close: () => void;
};

export const AuthModal = ({ isOpen, close, ...rest }: AuthModalProps) => {

    return (
        <ThemedModal noExit isOpen={isOpen} close={close} {...rest} >
            <View style={[globalStyles.innerModal, styles.container]} >
                <TabHeading title={'WELCOME TO JOE\'S!'} />
                <Login />
            </View >
        </ThemedModal >

    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    linkText: {


    }
});