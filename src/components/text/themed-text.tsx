import { Text, type TextProps, StyleSheet } from 'react-native';
import { themedColors } from '@/constants/themed-colors';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'primaryBold' | 'subtitle' | 'link';
};

export function ThemedText(
    {
        style,
        lightColor,
        darkColor,
        type = 'default',
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
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins',
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'PoppinsSemiBold',
        color: themedColors.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 40,
        fontFamily: 'PoppinsBold',
        color: themedColors.primary,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        color: themedColors.tertiary,
    },
    primaryBold: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        color: themedColors.primary,
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: themedColors.primary,
        fontFamily: 'Poppins',
    },
});
