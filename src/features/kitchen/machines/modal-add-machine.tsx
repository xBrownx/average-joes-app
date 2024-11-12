import { Ionicons } from '@expo/vector-icons';
import {
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

import { ThemedInput } from '@/components/input';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import { UserMachine } from '@/domain';
import {
    FormState, portafilterOptions,
} from '@/features/kitchen/machines/types';
import { addUserMachine, useAppDispatch } from '@/store';
import { StateType } from '@/hooks/useCustomState';
import uuid from 'react-native-uuid';

type AddMachineProps = {
    parentState: FormState;
    updateParentState: (state: StateType<FormState>) => void;
    close: () => void;
    onSaveCallback?: (id: string) => void;
};

export function AddMachine({ parentState, updateParentState, close, onSaveCallback }: AddMachineProps) {
    const dispatch = useAppDispatch();

    const onSave = () => {
        const userMachine: UserMachine = {
            id: uuid.v4().toString(),
            make: parentState.make?? 'unknown',
            model: {
                id: uuid.v4().toString(),
                name: parentState.model?? 'unknown',
                portafilterSize: parentState.portafilterSize?? 'unknown',
            },
        };
        dispatch(addUserMachine(userMachine));
        if(onSaveCallback)
            onSaveCallback(userMachine.id);
        close();
    };

    return (
        <TouchableWithoutFeedback>
            <Animated.View
                entering={SlideInLeft.delay(50)}
                exiting={SlideOutLeft}
            >
                <View style={styles.modalInner}>
                    <View style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>
                            Add Your Machine
                        </ThemedText>
                        <Ionicons.Button
                            name="search"
                            size={24}
                            backgroundColor={'transparent'}
                            color={themedColors.tertiary}
                            onPress={() => updateParentState({isSearch: true})}
                        />
                    </View>

                    <ThemedText type={'default'} style={styles.titleContainer}>
                        Add your machine profile, or use the search tool above.
                    </ThemedText>

                    <View style={styles.content}>
                        <ThemedInput
                            onValueChange={(text) => updateParentState({make: text})}
                            placeholder="Make"
                            value={parentState.make?? ''}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({model: text})}
                            placeholder="Model"
                            value={parentState.model?? ''}
                        />
                        <View style={styles.listContainer}>
                            <ThemedText
                                type={'defaultSemiBold'}
                                style={{ color: 'black' }}
                            >
                                Portafilter Size:
                            </ThemedText>

                            {portafilterOptions.map((option) => {
                                return (
                                    <TouchableOpacity
                                        key={option}
                                        style={styles.singleOptionContainer}
                                        onPress={() =>
                                            updateParentState({
                                                portafilterSize: option
                                            })
                                        }
                                    >
                                        <View style={styles.outerCircle}>
                                            {parentState.portafilterSize ===
                                            option ? (
                                                <View
                                                    style={styles.innerCircle}
                                                />
                                            ) : null}
                                        </View>
                                        <ThemedText>{option}</ThemedText>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <Button
                            title={'SAVE'}
                            color={themedColors.primary}
                            onPress={onSave}
                        />
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

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
    listContainer: {
        gap: 8,
        marginVertical: 16,
    },
    reactLogo: {
        height: '70%',
        width: '100%',
        bottom: 0,
        marginBottom: '5%',
        position: 'absolute',
        objectFit: 'contain',
        alignSelf: 'center',
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
    input: {
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        padding: 8,
        borderRadius: 8,
    },
    outerCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: themedColors.primary,
    },
    singleOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        margin: 5,
    },
});

// export const AddMachineModal2 = ({
//     isOpen,
//     onClose,
//     withInput,
//     children,
//     ...rest
// }: AddMachineModalProps) => {
//     const dispatch = useAppDispatch();
//     const machines = useAppSelector(selectRemoteMachines);
//     const [modalState, setModalState] =
//         useState<AddMachineModalState>(initialModalState);
//
//     const updateState = (name: UpdateStateType, value: any) => {
//         setModalState((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };
//
//     useEffect(() => {
//         updateState('machinesDropdown', serverMachinesToDropdown(machines));
//     }, []);
//
//     const onMakeSelect = (text: string) => {
//         const machine = machines.find((machine) => machine.make === text);
//         if (!machine) {
//             updateState('isMakeSelected', false);
//             return;
//         }
//
//         const modelsDropdown = machine.models.map((model) => ({
//             label: model.name,
//             value: model.name,
//         }));
//
//         updateState('modelsDropdown', modelsDropdown);
//         updateState('selectedMake', text);
//         updateState('isMakeSelected', true);
//     };
//
//     const onModelSelect = (text: string) => {
//         if (!text) return;
//         const make = machines.find(
//             (machine) => machine.make === modalState.selectedMake,
//         );
//         const model = make
//             ? make.models.find((model) => model.name === text)
//             : null;
//
//         if (!model) {
//             updateState('isMakeSelected', false);
//             updateState('isModelSelected', false);
//             return;
//         }
//         updateState('selectedModel', text);
//         updateState('isModelSelected', true);
//     };
//
//     const onSave = () => {
//         if (!modalState.isModelSelected || !modalState.isMakeSelected) return;
//         const make = machines.find(
//             (machine) => machine.make === modalState.selectedMake,
//         );
//         const model = make
//             ? make.models.find(
//                   (model) => model.name === modalState.selectedModel,
//               )
//             : null;
//         if (!model || !make) return;
//
//         const userMachine: UserMachine = {
//             id: make.make,
//             make: make.make,
//             model: model,
//         };
//
//         dispatch(addUserMachine(userMachine));
//         onClose();
//     };
//
//     return (
//         <RNModal
//             visible={isOpen}
//             transparent
//             animationType="fade"
//             statusBarTranslucent
//             style={styles.container}
//             {...rest}
//         ></RNModal>
//     );
// };
//
// type AddMachineModalState = {
//     machinesDropdown: DropdownData[];
//     modelsDropdown: DropdownData[];
//     selectedMake: string;
//     selectedModel: string;
//     isMakeSelected: boolean;
//     isModelSelected: boolean;
// };
//
// const initialModalState: AddMachineModalState = {
//     machinesDropdown: [],
//     modelsDropdown: [],
//     selectedMake: '',
//     selectedModel: '',
//     isMakeSelected: false,
//     isModelSelected: false,
// };
//
// type UpdateStateType =
//     | 'machinesDropdown'
//     | 'modelsDropdown'
//     | 'selectedMake'
//     | 'selectedModel'
//     | 'isMakeSelected'
//     | 'isModelSelected';

// <TouchableOpacity style={styles.modalOuter} onPress={onClose}>
//                 <TouchableWithoutFeedback>
//                     <View style={styles.modalInner}>
//                         <View style={styles.titleContainer}>
//                             <ThemedText type={'subtitle'}>Add Your Machine</ThemedText>
//                             <Ionicons.Button
//                                 name="search"
//                                 size={24}
//                                 backgroundColor={'transparent'}
//                                 color={themedColors.tertiary}
//                                 onPress={() => {
//                                 }}
//                             />
//                         </View>
//
//                         <ThemedText
//                             type={'default'}
//                             style={styles.titleContainer}
//                         >
//                             Search our database or add your own!
//                         </ThemedText>
//
//                         <View style={styles.content}>
//                             <DropdownComponent
//                                 placeholder={'Make'}
//                                 data={modalState.machinesDropdown}
//                                 onChange={(text) => onMakeSelect(text)}
//                             />
//
//                             {modalState.isMakeSelected &&
//                                 <DropdownComponent
//                                     placeholder={'Model'}
//                                     data={modalState.modelsDropdown}
//                                     onChange={(text) => onModelSelect(text)}
//                                 />
//                             }
//
//                             <Button
//                                 title={'SAVE'}
//                                 color={themedColors.primary}
//                                 onPress={onSave}
//                             />
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </TouchableOpacity>
