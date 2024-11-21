import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedModal } from '@/components/modal';
import { SignIn } from '@/features/auth/sign-in';
import { SignUp } from "@/features/auth/sign-up";
import { ThemedModalProps } from "@/components/modal/types";
import { LayoutAnimationConfig } from "react-native-reanimated";

export const AuthModal = ({isOpen, onClose}: ThemedModalProps) => {

    const [isSignUp, setSignUp] = React.useState(false);

    return (
        <ThemedModal noExit isOpen={isOpen} onClose={onClose}>
            <LayoutAnimationConfig skipEntering>
                {isSignUp
                    ? <SignUp setSignIn={() => setSignUp(false)} />
                    : <SignIn setSignUp={() => setSignUp(true)} />
                }
            </LayoutAnimationConfig>
        </ThemedModal>

    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    }
})
