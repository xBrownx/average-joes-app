import { themedColors } from '@/constants/themed-colors';import { StyleSheet, type TextProps, TouchableOpacity } from 'react-native';import React from 'react';import { ThemedText } from '@/components/text/themed-text';type ThemedButtonProps = TextProps & {    children: string;    type?: 'primary' | 'secondary' | 'variant';    textType?: 'large' | 'small';    onPress?: () => void;}export function ThemedButton(    {        children,        type = 'primary',        textType = 'large',        onPress,        ...rest    }: ThemedButtonProps) {    return (        <TouchableOpacity            onPress={onPress ? onPress : undefined}            style={[                styles.buttonContainer,                type === 'primary' ? styles.primary : undefined,                type === 'secondary' ? styles.secondary : undefined,                type === 'variant' ? styles.variant : undefined,            ]}            {...rest}        >            <ThemedText type={'primaryBold'} style={[                type === 'primary' ? styles.primaryText : undefined,                type === 'secondary' ? styles.secondaryText : undefined,                type === 'variant' ? styles.secondaryText : undefined,                textType === 'large' ? styles.large : undefined,                textType === 'small' ? styles.small : undefined,            ]}>                {children.toUpperCase()}            </ThemedText>        </TouchableOpacity>    );}const styles = StyleSheet.create({    buttonContainer: {        height: 33,        alignItems: 'center',        justifyContent: 'center',        borderRadius: 4,        borderColor: '#FFF',        borderWidth: 1,        width: '100%',    },    primary:{        backgroundColor: themedColors.button.primary,    },    secondary:{        backgroundColor: themedColors.button.secondary,    },    variant:{        backgroundColor: themedColors.button.variant,    },    primaryText:{        color: 'black',    },    secondaryText:{        color: 'white',    },    large:{        fontSize: 18,        lineHeight: 36,    },    small:{        fontSize: 13,        lineHeight: 26,    },    buttonText: {        marginBottom: 0,        fontWeight: 'bold'    }});