import { createContext, PropsWithChildren, useContext, useState } from "react";
import { PantryScreens } from "@/features/pantry/types";

type PantryScreenContextType = {
    screen: PantryScreens,
    setScreen: (screen: PantryScreens) => void,
}

const PantryScreenContext = createContext<PantryScreenContextType | null>(null);

export const usePantryScreenContext = () => {
    const context = useContext(PantryScreenContext);
    if (!context) {
        throw new Error('useScreenContext must be used within a QuizScreenContextProvider');
    }
    return context;
};

export const PantryScreenContextProvider = ({ children }: PropsWithChildren) => {
    const [screen, setScreen] = useState<PantryScreens>('main');

    return (
        <PantryScreenContext.Provider value={{screen, setScreen}}>
            {children}
        </PantryScreenContext.Provider>
    );
}