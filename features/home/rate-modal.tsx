import { Button, Modal as RNModal, ModalProps as RNModalProps, StyleSheet, Text, TextInput, View } from 'react-native';
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/text/themed-text";
import colors from "@/components/colors";
import { Rating } from 'react-native-ratings';
import Ionicons from "@expo/vector-icons/Ionicons";

type RateModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
}

export function RateModal({isOpen, onClose, withInput, children, ...rest}: RateModalProps) {

    const [feedbackText, setFeedbackText] = React.useState<string>("");

    const handleClose = () => {
        setFeedbackText('')
        onClose();
    }

    const handleOk = () => {
        setFeedbackText('')
        handleClose()
    }

    const onTextChange = (text: string) => {
        setFeedbackText(text);
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
                    <View>
                        <View style={styles.titleContainer}>
                            <ThemedText type={'subtitle'}>
                                RATE US!
                            </ThemedText>
                            <Ionicons name={'close'} size={30} color={colors.tertiary} onPress={handleClose} />
                        </View>
                        <ThemedText type={'default'}>
                            Your feedback helps us grow and give the people what they want.
                        </ThemedText>
                    </View>
                    <Rating
                        type='heart'
                        ratingCount={5}
                        imageSize={50}
                        onFinishRating={() => {
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onTextChange}
                        placeholder="Feedback"
                        value={feedbackText}
                        multiline={true}
                    />
                    <ThemedView>
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
        justifyContent: 'space-between',
    },
    modalOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        gap: 16,
        width: '100%'
    },
    input: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 120,
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 0,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        borderRadius: 8,
    },
});