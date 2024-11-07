import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

import { themedColors } from '@/constants/themed-colors';

type TypeWriterProps = {
    textArr: string[];
    type?: 'default' | 'title' | 'defaultSemiBold' | 'primaryBold' | 'subtitle' | 'link';
    speed?: number;
    onComplete?: () => void;
};

type Timeouts = {
    cursorTimeout: ReturnType<typeof setTimeout> | undefined;
    typingTimeout: ReturnType<typeof setTimeout> | undefined;
    firstNewLineTimeout: ReturnType<typeof setTimeout> | undefined;
    secondNewLineTimeout: ReturnType<typeof setTimeout> | undefined;
};

const initTimeouts: Timeouts = {
    cursorTimeout: undefined,
    typingTimeout: undefined,
    firstNewLineTimeout: undefined,
    secondNewLineTimeout: undefined,
};

export function TypeWriterText({
                                   textArr,
                                   type,
                                   speed,
                                   onComplete,
                               }: TypeWriterProps) {
    const [text, setText] = useState('');
    const [cursorColor, setCursorColor] = useState('transparent');
    const [messageIndex, setMessageIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [timeouts, setTimeouts] = useState(initTimeouts);

    const textRef = useRef(text);
    textRef.current = text;

    const cursorColorRef = useRef(cursorColor);
    cursorColorRef.current = cursorColor;

    const messageIndexRef = useRef(messageIndex);
    messageIndexRef.current = messageIndex;

    const textIndexRef = useRef(textIndex);
    textIndexRef.current = textIndex;

    const timeoutsRef = useRef(timeouts);
    timeoutsRef.current = timeouts;

    const typingAnimation = () => {
        if (textIndexRef.current < textArr[messageIndexRef.current].length) {
            setText(
                textRef.current +
                textArr[messageIndexRef.current].charAt(
                    textIndexRef.current,
                ),
            );
            setTextIndex(textIndexRef.current + 1);

            const updatedTimeouts = { ...timeoutsRef.current };
            updatedTimeouts.typingTimeout = setTimeout(
                typingAnimation,
                speed ?? 50,
            );
            setTimeouts(updatedTimeouts);
        } else if (messageIndexRef.current + 1 < textArr.length) {
            setMessageIndex(messageIndexRef.current + 1);
            setTextIndex(0);

            const updatedTimeouts = { ...timeoutsRef.current };
            updatedTimeouts.firstNewLineTimeout = setTimeout(
                newLineAnimation,
                120,
            );
            updatedTimeouts.secondNewLineTimeout = setTimeout(
                newLineAnimation,
                200,
            );
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 280);
            setTimeouts(updatedTimeouts);
        } else {
            clearInterval(timeoutsRef.current.cursorTimeout);
            setCursorColor('transparent');

            if (onComplete) {
                onComplete();
            }
        }
    };

    const newLineAnimation = () => {
        setText(textRef.current + '\n');
    };

    const cursorAnimation = () => {
        if (cursorColorRef.current === 'transparent') {
            setCursorColor('#8EA960');
        } else {
            setCursorColor('transparent');
        }
    };

    useEffect(() => {
        const updatedTimeouts = { ...timeoutsRef.current };
        updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 500);
        updatedTimeouts.cursorTimeout = setInterval(cursorAnimation, 250);
        setTimeouts(updatedTimeouts);

        return () => {
            clearTimeout(timeoutsRef.current.typingTimeout);
            clearTimeout(timeoutsRef.current.firstNewLineTimeout);
            clearTimeout(timeoutsRef.current.secondNewLineTimeout);
            clearInterval(timeoutsRef.current.cursorTimeout);
        };
    }, []);

    return (
        <Text
            style={[
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'primaryBold' ? styles.primaryBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
            ]}
        >
            {text}
            <Text style={[
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'primaryBold' ? styles.primaryBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                {color: cursorColorRef.current,},
            ]}>|</Text>
        </Text>
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
    primaryBold: {
         fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        color: themedColors.primary,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        color: themedColors.tertiary,
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: themedColors.primary,
        fontFamily: 'Poppins',
    },
});