import {
    Button,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleSheet, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { addUserPantryItem } from '@/store/slice/local-data-slice';
import { ThemedText } from '@/components/text/themed-text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PantryItem } from '@/domain';
import uuid from 'react-native-uuid';
import { ThemedInput } from '@/components/input';
import CheckBox from 'expo-checkbox';
import { ThemedCheckbox } from '@/components/checkbox/themed-checkbox';
import { ThemedModal } from '@/components/modal';
import { ThemedDatePicker } from '@/components/date-picker';
import { dateObjToString } from '@/usecase/date-usecase';

type AddPantryModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

interface FormState {
    blendName: string;
    roasterName: string;
    roastDate: string;
    expiryDate: string;
    isNotifyExpiry: boolean;
}

type FormStateAction = 'blendName' | 'roasterName' | 'roastDate' | 'expiryDate' | 'isNotifyExpiry';

const initialFormState: FormState = {
    blendName: '',
    roasterName: '',
    roastDate: '',
    expiryDate: '',
    isNotifyExpiry: false,
};

export const AddPantryModal = ({ isOpen, onClose, withInput, children, ...rest }: AddPantryModalProps) => {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState<FormState>(initialFormState);


    const closeModal = () => {
        setFormState(initialFormState);
        onClose();
    };

    const updateState = (name: FormStateAction, value: any) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxPress = () => {
        setFormState(prevState => ({
            ...prevState,
            'isNotifyExpiry': !prevState.isNotifyExpiry,
        }));
    };

    const onSave = () => {
        const pantryItem: PantryItem = {
            id: uuid.v4().toString(),
            blendName: formState.blendName,
            roasterName: formState.roasterName,
            roastDate: formState.roastDate,
            expiryDate: formState.expiryDate,
            isNotifyExpiry: formState.isNotifyExpiry,
        };
        dispatch(addUserPantryItem(pantryItem));
        closeModal();
    };

    return (
        <ThemedModal isOpen={isOpen} close={closeModal} >
            <View style={styles.modalInner} >
                <View style={styles.titleContainer} >
                    <ThemedText type={'subtitle'} >Add a Pantry Item</ThemedText >
                    <Ionicons.Button
                        name="search"
                        size={24}
                        backgroundColor={'transparent'}
                        style={styles.searchIcon}
                        color={themedColors.tertiary}
                        onPress={() => {
                        }}
                    />
                </View >

                <ThemedText
                    type={'default'}
                    style={styles.titleContainer}
                >
                    Let Joe help you keep your beans fresh!
                </ThemedText >

                <View style={styles.content} >
                    <ThemedInput
                        onValueChange={(text) => updateState('blendName', text)}
                        placeholder="Blend Name"
                        value={formState.blendName}
                    />
                    <ThemedInput
                        onValueChange={(text) => updateState('roasterName', text)}
                        placeholder="Roaster Name"
                        value={formState.roasterName}
                    />
                    <ThemedDatePicker
                        onValueChange={(date: Date) => updateState('roastDate', dateObjToString(date))}
                        placeholder="Roast Date"
                        value={formState.roastDate}
                    />
                    <ThemedDatePicker
                        onValueChange={(date: Date) => updateState('expiryDate', dateObjToString(date))}
                        placeholder="Expiry Date"
                        value={formState.expiryDate}
                    />
                    <ThemedCheckbox
                        checked={formState.isNotifyExpiry}
                        setChecked={handleCheckboxPress}
                        label="Notify Expiry?"
                    />
                    <Button
                        title={'SAVE'}
                        color={themedColors.primary}
                        onPress={onSave}
                    />
                </View >
            </View >
        </ThemedModal >
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    searchIcon: {
        padding: 0,
        margin: 0,
    },
    listContainer: {
        gap: 8,
        marginVertical: 16,
    },
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
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    content: {
        gap: 8,
    },
});