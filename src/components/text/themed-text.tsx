import { Text, type TextProps, StyleSheet } from 'react-native';
import { THEME_COLOURS } from '@/constants/theme-colors';
import { Kalam_400Regular } from "@expo-google-fonts/kalam";

export type ThemedTextProps = TextProps & {
    light?: boolean;
    type?: 'default' | 'primary-light' | 'title' | 'defaultSemiBold' | 'primaryBold' | 'subtitle' | 'link';
    color?: 'light' | 'dark';
};

export function ThemedText(
    {
        type = 'default',
        color = 'light',
        style,
        ...rest
    }: ThemedTextProps) {

    return (
        <Text
            style={[
                type === 'default' ? styles.default : undefined,
                type === 'primary-light' ? styles.primaryLight : undefined,
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
    primaryLight: {
        fontSize: 18,
        lineHeight: 30,
        fontFamily: 'Kalam_300Light',
    },
    defaultSemiBold: {
        fontSize: 18,
        lineHeight: 30,
        fontFamily: 'Kalam_700Bold',
        color: THEME_COLOURS.primary,
    },
    title: {
        fontSize: 40,
        lineHeight: 50,
        fontFamily: 'Kalam_700Bold',
        color: '#FFF',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: '400',
        color: THEME_COLOURS.white,
        opacity: 1
    },
    primaryBold: {
        fontSize: 22,
        fontFamily: 'Kalam_700Bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: THEME_COLOURS.primary,
        fontFamily: 'Kalam_400Regular',
    },
    light: {
        color: '#FFF',
    },
    dark: {
        color: '#000',
    }
});
