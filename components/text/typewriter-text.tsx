import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { StyleProps } from "react-native-reanimated";
import colors from "@/components/colors";

type TypeWriterProps = {
    textArr: string[];
    textStyle?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    speed? : number;
    onComplete: () => void;
}

type Timeouts = {
    cursorTimeout: ReturnType<typeof setTimeout> | undefined,
    typingTimeout: ReturnType<typeof setTimeout> | undefined,
    firstNewLineTimeout: ReturnType<typeof setTimeout> | undefined,
    secondNewLineTimeout: ReturnType<typeof setTimeout> | undefined,
}

const initTimeouts: Timeouts = {
    cursorTimeout: undefined,
    typingTimeout: undefined,
    firstNewLineTimeout: undefined,
    secondNewLineTimeout: undefined,
}

export default function TypeWriter({textArr, textStyle, speed, onComplete}: TypeWriterProps) {
    let [text, setText] = useState("");
    let [cursorColor, setCursorColor] = useState("transparent");
    let [messageIndex, setMessageIndex] = useState(0);
    let [textIndex, setTextIndex] = useState(0);
    let [timeouts, setTimeouts] = useState(initTimeouts);

    let textRef = useRef(text);
    textRef.current = text;

    let cursorColorRef = useRef(cursorColor);
    cursorColorRef.current = cursorColor;

    let messageIndexRef = useRef(messageIndex);
    messageIndexRef.current = messageIndex;

    let textIndexRef = useRef(textIndex);
    textIndexRef.current = textIndex;

    let timeoutsRef = useRef(timeouts);
    timeoutsRef.current = timeouts;

    let typingAnimation = () => {
        if (textIndexRef.current < textArr[messageIndexRef.current].length) {
            setText(textRef.current + textArr[messageIndexRef.current].charAt(textIndexRef.current));
            setTextIndex(textIndexRef.current + 1);

            let updatedTimeouts = {...timeoutsRef.current};
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, speed?? 50);
            setTimeouts(updatedTimeouts);
        } else if (messageIndexRef.current + 1 < textArr.length) {
            setMessageIndex(messageIndexRef.current + 1);
            setTextIndex(0);

            let updatedTimeouts = {...timeoutsRef.current};
            updatedTimeouts.firstNewLineTimeout = setTimeout(newLineAnimation, 120);
            updatedTimeouts.secondNewLineTimeout = setTimeout(newLineAnimation, 200);
            updatedTimeouts.typingTimeout = setTimeout(typingAnimation, 280);
            setTimeouts(updatedTimeouts);
        } else {
            clearInterval(timeoutsRef.current.cursorTimeout);
            setCursorColor("transparent");
            onComplete();
        }
    };

    let newLineAnimation = () => {
        setText(textRef.current + "\n");
    };

    let cursorAnimation = () => {
        if (cursorColorRef.current === "transparent") {
            setCursorColor("#8EA960");
        } else {
            setCursorColor("transparent");
        }
    };

    useEffect(() => {
        let updatedTimeouts = {...timeoutsRef.current};
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
        <Text style={[
            textStyle === 'default' ? styles.default : undefined,
            textStyle === 'title' ? styles.title : undefined,
            textStyle === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            textStyle === 'subtitle' ? styles.subtitle : undefined,
            textStyle === 'link' ? styles.link : undefined,
        ]}>
            {text}
            <Text style={{color: cursorColor, fontSize: 35}}>|</Text>
        </Text>
    )
};

let styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins'
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        fontFamily: 'PoppinsSemiBold',
        color: colors.primary
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 40,
        fontFamily: 'PoppinsBold',
        color: colors.primary
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'PoppinsBold',
        color: colors.tertiary
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: colors.primary,
        fontFamily: 'Poppins'
    },
})