import {
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { THEME_COLOURS } from '@/constants/theme-colors';
import React from 'react';
import { useAppDispatch } from '@/store/store';
import { addUserPantryItem } from '@/store/slice/local-data-slice';
import { ThemedText } from '@/components/text/themed-text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PantryItem } from '@/domain';
import uuid from 'react-native-uuid';
import { ThemedInput } from '@/components/input';
import { ThemedCheckbox } from '@/components/checkbox/themed-checkbox';
import { ThemedModal } from '@/components/modal';
import { ThemedDatePicker } from '@/components/date-picker';
import { dateObjToString } from '@/usecase/date-usecase';
import { ThemedModalProps } from "@/components/modal/types";
import { useCustomState } from "@/hooks";

interface FormState {
    blendName?: string;
    roasterName?: string;
    roastDate?: string;
    expiryDate?: string;
    isNotifyExpiry?: boolean;
}

export const AddPantryModal = ({isOpen, onClose}: ThemedModalProps) => {
    const dispatch = useAppDispatch();
    const {state, updateState} = useCustomState<FormState>({
        blendName: '',
        roasterName: '',
        roastDate: '',
        expiryDate: '',
        isNotifyExpiry: false,
    });


    const closeModal = () => {
        // setFormState(initialFormState);
        onClose();
    };

    const handleCheckboxPress = () => {
        updateState({
            isNotifyExpiry: !state.isNotifyExpiry,
        });
    };

    const onSave = () => {
        const pantryItem: PantryItem = {
            id: uuid.v4().toString(),
            blendName: state.blendName ?? '',
            roasterName: state.roasterName ?? '',
            roastDate: state.roastDate ?? '',
            expiryDate: state.expiryDate ?? '',
            isNotifyExpiry: state.isNotifyExpiry ?? false,
        };
        dispatch(addUserPantryItem(pantryItem));
        closeModal();
    };

    return (
        <ThemedModal isOpen={isOpen} onClose={closeModal}>
            <View style={styles.modalInner}>
                <View style={styles.titleContainer}>
                    <ThemedText type={'subtitle'}>Add a Pantry Item</ThemedText>
                    <Ionicons.Button
                        name="search"
                        size={24}
                        backgroundColor={'transparent'}
                        style={styles.searchIcon}
                        color={THEME_COLOURS.tertiary}
                        onPress={() => {
                        }}
                    />
                </View>

                <ThemedText
                    type={'default'}
                    style={styles.titleContainer}
                >
                    Let Joe help you keep your beans fresh!
                </ThemedText>

                <View style={styles.content}>
                    <ThemedInput
                        onValueChange={(text) => updateState({blendName: text})}
                        placeholder="Blend Name"
                        value={state.blendName ?? ''}
                    />
                    <ThemedInput
                        onValueChange={(text) => updateState({roasterName: text})}
                        placeholder="Roaster Name"
                        value={state.roasterName ?? ''}
                    />
                    <ThemedDatePicker
                        onValueChange={(date: Date) => updateState({roastDate: dateObjToString(date)})}
                        placeholder="Roast Date"
                        value={state.roastDate ?? ''}
                    />
                    <ThemedDatePicker
                        onValueChange={(date: Date) => updateState({expiryDate: dateObjToString(date)})}
                        placeholder="Expiry Date"
                        value={state.expiryDate ?? ''}
                    />
                    <ThemedCheckbox
                        checked={state.isNotifyExpiry ?? false}
                        setChecked={handleCheckboxPress}
                        label="Notify Expiry?"
                    />
                    <Button
                        title={'SAVE'}
                        color={THEME_COLOURS.primary}
                        onPress={onSave}
                    />
                </View>
            </View>
        </ThemedModal>
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