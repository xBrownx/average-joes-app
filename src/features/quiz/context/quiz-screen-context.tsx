import { QuizScreen } from "@/features/quiz/types/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type QuizScreenContextType = {
    screen: QuizScreen,
    setScreen: (screen: QuizScreen) => void,
}

const QuizScreenContext = createContext<QuizScreenContextType | null>(null);

export const useQuizScreenContext = () => {
    const context = useContext(QuizScreenContext);
    if (!context) {
        throw new Error('useScreenContext must be used within a QuizScreenContextProvider');
    }
    return context;
};

export const QuizScreenContextProvider = ({ children }: PropsWithChildren) => {
    const [screen, setScreen] = useState<QuizScreen>('select-coffee');

    return (
        <QuizScreenContext.Provider value={{screen, setScreen}}>
            {children}
        </QuizScreenContext.Provider>
    );
}