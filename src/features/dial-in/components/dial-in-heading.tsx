import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { themedColors } from '@/constants/themed-colors';
import { ThemedText } from '@/components/text/themed-text';
import React from 'react';
import { selectMuted, setMuted, useAppDispatch, useAppSelector } from '@/store';

interface DialInHeadingProps {
    onBack: () => void;
    onShow: () => void;
    icon: 'back' | 'exit';
    heading?: string;
}

export function DialInHeading({ onBack, onShow, icon, heading, }: DialInHeadingProps) {
    const dispatch = useAppDispatch();
    const muted = useAppSelector(selectMuted);

    const toggleMute = () => {
        dispatch(setMuted(!muted))
    }

    return (
        <View style={styles.header} >
            <Ionicons.Button
                name={icon === 'back' ? 'arrow-back' : 'close'}
                size={24}
                backgroundColor={'transparent'}
                color={themedColors.primary}
                style={{ padding: 0, margin: 0 }}
                onPress={onBack}
            />

            {heading && <ThemedText type={'title'} >{heading}</ThemedText >}

            <View style={styles.config} >
                    <Ionicons.Button
                        name={muted ? 'volume-mute' : 'volume-high'}
                        size={24}
                        backgroundColor={'transparent'}
                        color={themedColors.primary}
                        style={{ padding: 0, margin: 0 }}
                        onPress={toggleMute?? undefined}
                    />
                <TouchableOpacity onPress={onShow} >
                    <ThemedText
                        type="default"
                        style={{ color: themedColors.primary }}
                    >
                        SHOW
                    </ThemedText >
                </TouchableOpacity >
            </View >
        </View >
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
    },

});