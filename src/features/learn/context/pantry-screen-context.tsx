import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LearnScreens } from '@/features/learn/types';

type LearnScreenContextType = {
    screen: LearnScreens,
    setScreen: (screen: LearnScreens) => void,
}

const LearnScreenContext = createContext<LearnScreenContextType | null>(null);

export const useLearnScreenContext = () => {
    const context = useContext(LearnScreenContext);
    if (!context) {
        throw new Error('useScreenContext must be used within a LearnScreenContextProvider');
    }
    return context;
};

export const LearnScreenContextProvider = ({ children }: PropsWithChildren) => {
    const [screen, setScreen] = useState<LearnScreens>('main');

    return (
        <LearnScreenContext.Provider value={{screen, setScreen}}>
            {children}
        </LearnScreenContext.Provider>
    );
}