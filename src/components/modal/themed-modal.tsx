import {
    StyleSheet,
    View,
    ModalProps as RNModalProps,
    Modal as RNModal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";

type ThemedModalProps = RNModalProps & {
    noExit?: boolean;
    isOpen: boolean;
    close: () => void;
};

export function ThemedModal({noExit, isOpen, close, children}: ThemedModalProps) {
    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <TouchableOpacity style={styles.modalOuter} onPress={noExit ? undefined : close} >
                <TouchableWithoutFeedback >
                    {children}
                </TouchableWithoutFeedback >
            </TouchableOpacity >
        </RNModal >
    );
}

const styles = StyleSheet.create({
    modalOuter: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalInner: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 30,
        backgroundColor: 'white',
        borderRadius: 8,
    },

});