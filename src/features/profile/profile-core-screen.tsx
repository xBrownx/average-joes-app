import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Button, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TypeWriterText } from '@/components/typewriter';
import { THEME_COLOURS } from '@/constants/theme-colors';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Dropdown } from "react-native-element-dropdown";
import { useCustomState } from "@/hooks";
import {
    selectDefaultMachine,
    selectUserMachines,
    setDefaultUserMachine,
    useAppDispatch,
    useAppSelector
} from "@/store";
import { userMachinesToDropdown } from "@/usecase";
import { Ionicons } from "@expo/vector-icons";
import { AddMachineModal } from "@/features/kitchen/machines/modal-base";
import { machineIdToUserMachine } from "@/features/kitchen/machines/usecase";
import { UserMachine } from "@/domain";
import { ThemedText } from "@/components/text";
import { DropdownWithLabel } from "@/features/profile/components/dropdown-with-label";

interface ProfileCoreState {
    selectedMachine?: string;
    selectedGrinder?: string;
    addMachineModal?: boolean;
    addGrinderModal?: boolean;
}

const ADD_NEW = {label: 'ADD NEW', value: 'add'}

export default function ProfileCoreScreen() {
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const userMachines = useAppSelector(selectUserMachines);
    const defaultMachine = useAppSelector(selectDefaultMachine);
    const userMachineData = userMachines.length > 0 ? [...userMachinesToDropdown(userMachines), ADD_NEW] : [];

    const {state, updateState} = useCustomState<ProfileCoreState>({
        selectedMachine: defaultMachine?.model.name ?? 'Tap to add',
        selectedGrinder: defaultMachine?.model.name ?? 'Tap to add',
        addMachineModal: false,
        addGrinderModal: false,
    });

    const onSelectUserMachine = (value: string) => {
        if (value === 'add') {
            updateState({addMachineModal: true});
        } else {
            const userMachine = machineIdToUserMachine(value, userMachines);
            if (userMachine)
                dispatch(setDefaultUserMachine(userMachine));
        }
    }

    const onSelectUserGrinder = (value: string) => {
        if (value === 'add') {
            updateState({addGrinderModal: true});
        } else {
            const userMachine = machineIdToUserMachine(value, userMachines);
            if (userMachine)
                dispatch(setDefaultUserMachine(userMachine));
        }
    }

    function signOut() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <>
            {isFocused &&
                <ParallaxScrollView
                    headerBackgroundColor={{light: '#F0E8E2', dark: '#ce2127'}}
                    headerImage={
                        <Image
                            source={require('@/assets/images/average_joe_logo_white.png')}
                            style={styles.headerImage}
                        />
                    }>
                    <AddMachineModal
                        isOpen={state.addMachineModal ?? false}
                        onClose={() => updateState({addMachineModal: false})}
                    />

                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <TypeWriterText type={'title'} textArr={['PROFILE']} />
                        </View>

                        <DropdownWithLabel
                            label={'Default Machine'}
                            data={userMachineData}
                            value={defaultMachine ? defaultMachine.model.name : 'Tap to add'}
                            onChange={value => onSelectUserMachine(value.value)}
                            onAddPress={() => updateState({addMachineModal: true})}
                            isDisabled={userMachines.length}
                        />
                        <DropdownWithLabel
                            label={'Default Grinder'}
                            data={userMachineData}
                            value={defaultMachine ? defaultMachine.model.name : 'Tap to add'}
                            onChange={value => onSelectUserGrinder(value.value)}
                            onAddPress={() => updateState({addGrinderModal: true})}
                            isDisabled={userMachines.length}
                        />

                        <Button
                            title={'LOGOUT'}
                            color={THEME_COLOURS.primary}
                            onPress={signOut}
                        />
                    </View>
                </ParallaxScrollView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        height: '70%',
        width: '100%',
        bottom: 0,
        marginBottom: '15%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

});