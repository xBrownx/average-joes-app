import { Animated } from "react-native";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

export type DragData = {
    id: string,
    text: string
};

interface DragDropContextType {
    data?: DragData;
    pos: {
        x: Animated.Value;
        y: Animated.Value;
    };
    dropPos?: {
        x: number;
        y: number;
    };
    dragging: boolean;
    onDragStart: (data: DragData) => void;
    onDragEnd: (pos: { x: number; y: number }) => void;
    selection: string[],
    setSelection: (newSelection: string[]) => void;
    checkSelection: (id: string) => boolean;
    // setOptionUsed: (optionId: string, isUsed: boolean) => void;
    isComplete: boolean;
}

const DragDropContext = createContext<DragDropContextType | null>(null);

export const useDragDropContext = () => {
    const context = useContext(DragDropContext);
    if (!context) {
        throw new Error('useDragDropContext must be defined');
    }
    return context;
};

export const DragDropContextProvider = ({children}: { children: ReactNode },) => {
    const [data, setData] = useState<DragData>();
    const [dragging, setDragging] = useState(false);
    const [dropPos, setDropPos] = useState<DragDropContextType['dropPos']>();
    const pos = useRef({
        x: new Animated.Value(0),
        y: new Animated.Value(0),
    }).current;

    const onDragStart = useCallback<DragDropContextType['onDragStart']>(
        (data) => {
            setData(data);
            setDragging(true);
        }, []
    );
    const onDragEnd = useCallback<DragDropContextType['onDragEnd']>((pos) => {
            setDropPos(pos);
            setDragging(false);
        }, []
    );

    // const [opts, setOptions] = useState<DragDropContextType['opts']>({
    //     cappuccino: false,
    //     latte: false,
    //     espresso: false,
    //     'long-black': false,
    //     'iced-latte': false,
    // });
    //
    // const setOptionUsed = useCallback<DragDropContextType['setOptionUsed']>((optionId: string, isUsed: boolean) => {
    //         setOptions((prev) => ({
    //             ...prev,
    //             [optionId]: isUsed
    //         }))
    //     }, []
    // );

    const [isComplete, setComplete] = useState<DragDropContextType['isComplete']>(false);
    const [selection, setSelection] = useState<DragDropContextType['selection']>([])



    const checkSelection = (id: string) => {
        return selection.find(item => item === id) !== undefined;
    }

    useEffect(() => {
        console.log('ho ho ho')
        setComplete(selection.every(b => b !== ''))
    }, [selection])

    const value = {
        data,
        pos,
        dropPos,
        dragging,
        onDragStart,
        onDragEnd,
        selection,
        setSelection,
        checkSelection,
        isComplete,
    };

    return (
        <DragDropContext.Provider value={value}>
            {children}
        </DragDropContext.Provider>
    );
};