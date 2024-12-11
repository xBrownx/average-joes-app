import { Image, StyleSheet, View } from "react-native";
import { ThemedModal, ThemedModalProps } from "@/components/layout/themed-modal";
import { ThemedText } from "@/components/text";
import { ThemedButton } from "@/components/button";
import { useEffect, useState } from "react";
import { ConfirmBeans } from "@/features/brew/modal/confirm-beans";
import { KnowPlan } from "@/features/brew/modal/know-plan";
import { GrindSize } from "@/features/brew/modal/grind-size";

export function ConfirmBeanModal({isOpen, onClose}: ThemedModalProps) {
    const [title, setTitle] = useState<string>('Confirm your beans');
    const [modalScreen, setModalScreen] = useState<'confirm-beans' | 'know-plan' | 'grind-size'>('confirm-beans');

    const _onClose = () => {
        if(onClose) onClose();
    }

    useEffect(() => {
        setTitle(() => {
           switch(modalScreen) {
               case 'confirm-beans': return 'Confirm your beans';
               case 'know-plan': return 'Know the Plan';
               case 'grind-size': return 'Grind Size'
           }
        });
    }, [modalScreen]);

    return (
        <ThemedModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            noExit={true}
        >
            {
                {
                    'confirm-beans': <ConfirmBeans _continue={() => setModalScreen('know-plan')} />,
                    'know-plan': <KnowPlan _continue={() => setModalScreen('grind-size')} />,
                    'grind-size': <GrindSize _continue={_onClose} />
                }[modalScreen]
            }

        </ThemedModal>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    roastName: {
        color: '#111111',
        flexDirection: 'column',
        fontSize: 18,
    },
    roastImage: {},
    notesContainer: {
        width: '100%'
    },
    noteWrapper: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tastingNote: {
        color: '#111111',
        fontSize: 8,
        lineHeight: 16,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 18,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    button: {
        flex: 1
    },
})