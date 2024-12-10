import { Button, StyleSheet, TextInput, View } from 'react-native';
import React from "react";
import { ThemedText } from "@/components/text/themed-text";
import { THEME_COLOURS } from "@/constants/theme-colors";
import { Rating } from 'react-native-ratings';
import Ionicons from "@expo/vector-icons/Ionicons";
import { _themedModal } from "@/components/modal";
import { globalStyles } from "@/styles/global-styles";
import { ThemedModalProps } from "@/components/modal/types";


export function RateModal({isOpen, onClose}: ThemedModalProps) {

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
        <_themedModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <View style={globalStyles.innerModal}>
                <View>
                    <View style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>
                            RATE US!
                        </ThemedText>
                        <Ionicons name={'close'} size={30} color={THEME_COLOURS.tertiary} onPress={handleClose} />
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
                <View>
                    <Button
                        title={'OK'}
                        color={THEME_COLOURS.primary}
                        onPress={handleOk}
                    />
                </View>
            </View>
        </_themedModal>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
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