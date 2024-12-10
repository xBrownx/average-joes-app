import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDragDropContext } from "@/features/quiz/drag-drop/context";
import { DragOption } from "@/features/quiz/drag-drop/drag-option";
import { DropTarget } from "@/features/quiz/drag-drop/drop-target";
import { useEffect } from "react";

export function DragDrop({options, setComplete}: { options: string[], setComplete: (complete: boolean) => void }) {
    const { setSelection, isComplete } = useDragDropContext();
    useEffect(() => {
        setComplete(isComplete);
    }, [isComplete])



    useEffect(() => {
        setSelection(
            options.map(() => '')
        )
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.targetsContainer}>
                {options.map((_, index) => (
                    <DropTarget idx={index} />
                ))}

            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionRow}>
                    <DragOption data={{id: 'cappuccino', text: 'CAPPUCCINO'}} />
                    <DragOption data={{id: 'latte', text: 'LATTE'}} />
                </View>
                <View style={styles.optionRow}>
                    <DragOption data={{id: 'espresso', text: 'ESPRESSO'}} />
                    <DragOption data={{id: 'long-black', text: 'LONG BLACK'}} />
                </View>
                <View style={styles.optionRow}>
                    <DragOption data={{id: 'iced-latte', text: 'ICED LATE'}} />
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

function CompletionListener({setComplete}: { setComplete: (complete: boolean) => void }) {

    return (<></>);
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetsContainer: {
        flex: 1,
        gap: 16,
        width: '100%',
        alignItems: 'center',
    },
    optionsContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionRow: {
        flexDirection: 'row',
        gap: 34,
        width: '100%',
        justifyContent: 'center',
    },
});