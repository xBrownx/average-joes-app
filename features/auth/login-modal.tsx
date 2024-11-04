import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from "@/components/text/themed-text";
import colors from "@/components/colors";
import React from "react";
import { setUserName, useAppDispatch } from "@/store";
import { ThemedInput } from "@/components/input";
import { TabHeading } from "@/components/tab-heading/tab-heading";
import { ThemedModal } from "@/components/modal";

type LoginModalProps = {
    isOpen: boolean;
    close: () => void;
};

export const LoginModal = ({isOpen, close, ...rest}: LoginModalProps) => {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState<string>("");

    const onTextChange = (text: string) => {
        setName(text);
    }

    const handleOk = () => {
        if (name !== '' && name !== null) {
            dispatch(setUserName(name));
            close()
        }
    }

    return (
        <ThemedModal isOpen={isOpen} close={close} {...rest} >
            <View style={styles.container} >
                <TabHeading title={'WELCOME TO JOE\'S!'} />
                <View >
                    <ThemedText type={'default'} >
                        Before we get started, lets grab your name so we can be a bit more personal:
                    </ThemedText >
                </View >
                <ThemedInput
                    onValueChange={onTextChange}
                    placeholder="Enter Me"
                    value={name}
                />
                <Button title={'OK'} color={colors.primary} onPress={handleOk} />
            </View >
        </ThemedModal >

    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
});