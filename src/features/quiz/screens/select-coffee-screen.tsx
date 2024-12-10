import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from '@/assets/svg/bb-logo.svg';
import React from 'react';
import { ThemedText } from '@/components/text';
import { useQuizScreenContext } from '@/features/quiz/context/quiz-screen-context';
import { DragDrop } from "@/features/quiz/drag-drop/drag-drop-core";
import { ThemedButton } from "@/components/button";
import { DragDropContextProvider } from "@/features/quiz/drag-drop/context";


export function SelectCoffeeScreen() {
    const {setScreen} = useQuizScreenContext();
    const [isComplete, setComplete] = React.useState(false);

    return (

        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Logo width={133} height={64} />
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>
                    WHAT'S YOUR COFFEE PREFERENCE?
                </Text>
                <ThemedText style={styles.subheading}>
                    ORDER THEM 1 - 5
                </ThemedText>
            </View>
            <View style={styles.dndContainer}>
                <DragDropContextProvider>
                <DragDrop
                    options={['CAPPUCCINO','LATTE','ESPRESSO','LONG BLACK','ICED LATE']}
                    setComplete={setComplete}
                />
                </DragDropContextProvider>
            </View>
            <View style={styles.footerContainer}>
                {isComplete &&
                    <ThemedButton
                        textType={'small'}
                        onPress={() => setScreen('select-help')}
                    >
                        CONTINUE
                    </ThemedButton>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 53,
        gap: 12,
    },
    imageContainer: {
        width: 133,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        paddingHorizontal: 54,
        gap: 19,
    },
    heading: {
        color: 'white',
        fontSize: 22.06,
        paddingHorizontal: 40,
        textAlign: 'center',
    },
    subheading: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    sliderContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
    },
    footerContainer: {
        width: '100%',
        marginTop: 17,
        paddingHorizontal: 60,
        gap: 9,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLargeText: {
        fontSize: 18,
        color: 'white',
    },
    footerSmallText: {
        fontSize: 12,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    dndContainer: {
        width: '100%',
        height: '50%',
        flexDirection: 'column',

    }
});