import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themedColors } from '@/constants/themed-colors';
import React, { useState } from 'react';
import { selectMuted, setMuted, useAppDispatch, useAppSelector } from '@/store';
import { ModalConfirmExit } from "@/features/dial-in/components/modal-confirm-exit";

interface DialInHeadingProps {
    onBack: () => void;
    onShow: () => void;
    onExit: () => void;
}

export function DialInHeading({onBack, onShow, onExit}: DialInHeadingProps) {
    const dispatch = useAppDispatch();
    const muted = useAppSelector(selectMuted);
    const [isExitModal, setExitModal] = useState(false);
    const toggleMute = () => {
        dispatch(setMuted(!muted))
    }

    const onExitPressed = () => {
        setExitModal(true);
    }

    const onConfirmExit = (isExit: boolean) => {
        setExitModal(false);
        if(isExit) onExit();
    }

    return (
        <>
            <ModalConfirmExit isOpen={isExitModal} onClose={onConfirmExit} />
            <View style={styles.header}>
                <View style={styles.config}>
                    <Ionicons.Button
                        name={'arrow-back'}
                        size={24}
                        backgroundColor={'transparent'}
                        color={themedColors.tertiary}
                        style={{padding: 0, margin: 0}}
                        onPress={onBack}
                    />
                    <Ionicons.Button
                        name={muted ? 'volume-mute' : 'volume-high'}
                        size={24}
                        backgroundColor={'transparent'}
                        color={themedColors.tertiary}
                        style={{padding: 0, margin: 0}}
                        onPress={toggleMute ?? undefined}
                    />
                    <Ionicons.Button
                        name={'eye'}
                        size={24}
                        backgroundColor={'transparent'}
                        color={themedColors.tertiary}
                        style={{padding: 0, margin: 0}}
                        onPress={onShow}
                    />
                </View>
                <View style={styles.config}>
                    <Ionicons.Button
                        name={'close'}
                        size={24}
                        backgroundColor={'transparent'}
                        color={themedColors.tertiary}
                        style={{padding: 0, margin: 0}}
                        onPress={onExitPressed}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: themedColors.background,
    },
    config: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

});