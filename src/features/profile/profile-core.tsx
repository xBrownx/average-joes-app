import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Button, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TypeWriterText } from '@/components/typewriter';
import { themedColors } from '@/constants/themed-colors';
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

interface ProfileCoreState {
    selectedMachine?: string;
    addMachineModal?: boolean;
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
        addMachineModal: false,
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

                        <ThemedText>
                            Default Machine:
                        </ThemedText>
                        <Dropdown
                            style={styles.filter}
                            placeholder={'Tap to add'}
                            data={userMachineData}
                            value={defaultMachine ? defaultMachine.model.name : 'Tap to add'}
                            onChange={value => onSelectUserMachine(value.value)}
                            labelField={"label"}
                            valueField={"label"}
                            fontFamily={'Poppins_400Regular, sans-serif'}
                            itemTextStyle={{color: 'black'}}
                            selectedTextStyle={{color: themedColors.tertiary, fontWeight: 'bold'}}
                            renderRightIcon={() => (
                                <Ionicons.Button
                                    name={userMachines.length ? 'chevron-down' : 'add'}
                                    size={24} color={themedColors.tertiary}
                                    style={{marginRight: 8}}
                                    backgroundColor={'transparent'}
                                    onPress={userMachines.length ? undefined : () => updateState({addMachineModal: true})}
                                    iconStyle={{marginRight: 0}}
                                />
                            )}
                            disable={!userMachines.length}
                        />
                        <Button
                            title={'LOGOUT'}
                            color={themedColors.primary}
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
    filter: {
        backgroundColor: '#FFF',
        flex: 1,
        height: 40,
        paddingLeft: 8,
        color: themedColors.tertiary,
        fontWeight: 'bold'
    }
});