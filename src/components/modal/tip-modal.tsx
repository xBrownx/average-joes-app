import {  StyleSheet, View } from 'react-native';import { ThemedText } from '@/components/text/themed-text';import { THEME_COLOURS } from '@/constants/theme-colors';import React from 'react';import { _themedModal } from '@/components/modal/_themed-modal';import { Ionicons } from "@expo/vector-icons";import { ThemedModalProps } from "@/components/modal/types";type TipModalProps = ThemedModalProps & {    content: React.ReactNode;}export function TipModal({ isOpen, onClose, content }: TipModalProps) {    return (        <_themedModal isOpen={isOpen} onClose={onClose} >            <View style={styles.innerModal} >                <View style={styles.titleContainer} >                    <ThemedText type={'subtitle'} >                        HOT TIP 🔥                    </ThemedText >                    <Ionicons name={'arrow-forward'} size={28} color={THEME_COLOURS.tertiary} onPress={onClose} style={styles.closeIcon}/>                </View >                <View style={styles.contentContainer} >                    {content}                </View >            </View >        </_themedModal >    );}const styles = StyleSheet.create({    innerModal: {        width: '100%',        backgroundColor: 'white',        borderRadius: 10,        gap: 8,    },    titleContainer: {        flexDirection: 'row',        alignItems: 'center',        backgroundColor: THEME_COLOURS.backgroundSecondary,        borderTopRightRadius: 10,        borderTopLeftRadius: 10,        paddingVertical: 12,        paddingHorizontal: 16,        justifyContent: 'space-between',        elevation: 5,    },    closeIcon: {        margin: 0,        padding: 0,    },    contentContainer: {        gap: 16,        marginBottom: 16,        paddingVertical: 12,        paddingHorizontal: 16,    },});