import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/text";
import { DragData, useDragDropContext } from "@/features/quiz/drag-drop/context";

type Bounds = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export function DropTarget({idx}: { idx: number }) {
    const [color, setColor] = useState<'#6C6C6C' | '#EBD4B2'>('#6C6C6C');
    const [droppedData, setDroppedData] = useState<DragData | null>(null);

    const {dropPos, data, selection, setSelection } = useDragDropContext();
    const [bounds, setBounds] = useState<Bounds>();

    const onDrop = (data: DragData) => {
        setDroppedData(data);
        setColor('#EBD4B2');
        updateSelection(data)
    };

    const onUndo = (data: DragData | null) => {
        if(!data) return;
        setDroppedData(null);
        setColor('#6C6C6C');
        updateSelection(null);
    }

    const updateSelection = (data: DragData | null) => {
        const s = [...selection];
        s[idx] = data?.id ?? ''
        setSelection(s);
    }

    useEffect(() => {
        if (!dropPos || !bounds || !onDrop || !data ) return;

        const x2 = bounds.x + bounds.width;
        const y2 = bounds.y + bounds.height;

        if (
            dropPos.x >= bounds.x &&
            dropPos.x <= x2 &&
            dropPos.y >= bounds.y &&
            dropPos.y <= y2
        ) {
            onDrop(data);
        }
    }, [dropPos]);

    return (
        <View style={styles.container}>
            <View style={styles.number}>
                <ThemedText
                    type={'defaultSemiBold'}
                >
                    {idx + 1}
                </ThemedText>
            </View>
            <TouchableOpacity onPress={() => onUndo(droppedData)}>
                <View
                    style={[
                        styles.boxContainer,
                        {backgroundColor: color}
                    ]}
                    onLayout={(evt: any) => {
                        evt.target.measure(
                            (
                                _x: number,
                                _y: number,
                                width: number,
                                height: number,
                                pageX: number,
                                pageY: number,
                            ) => {
                                setBounds({x: pageX, y: pageY, width, height});
                            },
                        );
                    }}
                >
                    <ThemedText
                        type={'defaultSemiBold'}
                        style={styles.text}
                    >
                        {droppedData?.text ?? ''}
                    </ThemedText>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 39,
    },
    number: {
        backgroundColor: 'white',
        width: 31,
        height: 31,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numText: {
        lineHeight: 30,
    },
    boxContainer: {
        width: 133,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6C6C6C',
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 4,
    },
    text: {
        fontSize: 13,
    }
})