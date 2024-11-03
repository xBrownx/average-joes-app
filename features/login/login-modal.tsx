import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from "@/components/text/themed-text";
import { ThemedView } from "@/components/ThemedView";
import colors from "@/components/colors";
import React from "react";
import { setUserName, useAppDispatch } from "@/store";

type LoginModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

export const LoginModal = ({isOpen, onClose, withInput, children, ...rest}: LoginModalProps) => {
    const dispatch = useAppDispatch();
    const [name, setName] = React.useState<string>("");

    const handleOk = () => {
        if(name !== '' && name !== null ) {
            dispatch(setUserName(name));
            onClose()
        }
    }

    const onTextChange = (text: string) => {
        setName(text);
    }

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.modalOuter}>
                <View style={styles.modalInner}>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>
                            WELCOME TO JOE'S!
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.stepContainer}>
                       <ThemedText type={'default'}>
                           Before we get started, lets grab your name so we can be a bit more personal:
                       </ThemedText>
                    </ThemedView>
                    <TextInput
                        style={styles.input}
                        onChangeText={onTextChange}
                        placeholder="Enter Me"
                        value={name}
                    />
                    <ThemedView style={styles.stepContainer}>
                        <Button title={'OK'} color={colors.primary} onPress={handleOk} />
                    </ThemedView>
                </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepContainer: {
        gap: 16,
        marginBottom: 16,
    },
    modalOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    input: {
        height: 40,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        padding: 10,
    },
});