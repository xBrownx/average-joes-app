import { Text, type TextProps, StyleSheet } from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import { Kalam_400Regular } from "@expo-google-fonts/kalam";

export type ThemedTextProps = TextProps & {
    light?: boolean;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'primaryBold' | 'subtitle' | 'link';
    color?: 'light' | 'dark';
};

export function ThemedText(
    {
        type = 'default',
        color = 'dark',
        style,
        ...rest
    }: ThemedTextProps) {

    return (
        <Text
            style={[
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'primaryBold' ? styles.primaryBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                color === 'dark' ? styles.dark : undefined,
                color === 'light' ? styles.light : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 18.37,
        lineHeight: 24,
        fontFamily: 'Kalam_400Regular',
        color: '#FFF',
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'Kalam_400Regular, sans-serif',
        color: themedColors.primary,
    },
    title: {
        fontSize: 40,
        lineHeight: 50,
        fontFamily: 'Kalam_400Regular',
        color: '#FFF',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Kalam_400Regular, sans-serif',
        color: themedColors.tertiary,
        opacity: 0.8
    },
    primaryBold: {
        fontSize: 22,
        fontFamily: 'Kalam_700Bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: themedColors.primary,
        fontFamily: 'Kalam_400Regular',
    },
    light: {
        color: '#FFF',
    },
    dark: {
        color: '#000',
    }
});
