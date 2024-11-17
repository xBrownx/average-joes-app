import { ModalProps as RNModalProps } from "react-native/Libraries/Modal/Modal";

export type ThemedModalProps = RNModalProps & {
    noExit?: boolean;
    isOpen: boolean;
    onClose: () => void;
};