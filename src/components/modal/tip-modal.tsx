import { Button, ModalProps as RNModalProps, StyleSheet, View } from 'react-native';import { ThemedText } from '@/components/text/themed-text';import { themedColors } from '@/constants/themed-colors';import React from 'react';import { ThemedModal, ThemedModalProps } from '@/components/modal';import { globalStyles } from '@/styles/global-styles';import { ExternalLink } from '@/components/ExternalLink';import { Ionicons } from "@expo/vector-icons";type TipModalProps = ThemedModalProps & {    content: React.ReactNode;}export function TipModal({ isOpen, onClose, content }: TipModalProps) {    return (        <ThemedModal isOpen={isOpen} onClose={onClose} >            <View style={styles.innerModal} >                <View style={styles.titleContainer} >                    <ThemedText type={'subtitle'} >                        HOT TIP 🔥                    </ThemedText >                    <Ionicons name={'arrow-forward'} size={28} color={themedColors.tertiary} onPress={onClose} style={styles.closeIcon}/>                </View >                <View style={styles.contentContainer} >                    {content}                </View >            </View >        </ThemedModal >    );}const styles = StyleSheet.create({    innerModal: {        width: '100%',        backgroundColor: 'white',        borderRadius: 10,        gap: 8,    },    titleContainer: {        flexDirection: 'row',        alignItems: 'center',        backgroundColor: themedColors.backgroundSecondary,        borderTopRightRadius: 10,        borderTopLeftRadius: 10,        paddingVertical: 12,        paddingHorizontal: 16,        justifyContent: 'space-between',        elevation: 5,    },    closeIcon: {        margin: 0,        padding: 0,    },    contentContainer: {        gap: 16,        marginBottom: 16,        paddingVertical: 12,        paddingHorizontal: 16,    },});