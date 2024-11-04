import {
    Button,
    Modal as RNModal,
    ModalProps as RNModalProps,
    StyleSheet, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from "@/components/colors";
import React, { useEffect, useState } from "react";
import DropdownComponent, { DropdownData } from "@/components/dropdown/dropdown";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
    addUserBean,
    addUserMachine
} from "@/store/slice/local-data-slice";
import { UserBean } from "../../../domain";
import { serverBeansToDropdown, serverMachinesToDropdown, serverRoastersToDropdown } from "../../../usecase";
import { selectRemoteBeans, selectRemoteRoasters } from "@/store/slice/remote-data-slice";
import { ThemedText } from "@/components/text/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import { ThemedModal } from "@/components/modal";
import { ThemedInput } from "@/components/input";

type AddBeanModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

type AddBeanModalState = {
    roastersDropdown: DropdownData[],
    blendDropdown: DropdownData[],
    selectedRoaster: string,
    isRoasterSelected: boolean,
    selectedBlend: string,
    isBlendSelected: boolean,
}

const initialModalState: AddBeanModalState = {
    roastersDropdown: [],
    blendDropdown: [],
    selectedRoaster: '',
    isRoasterSelected: false,
    selectedBlend: '',
    isBlendSelected: false,
}

type UpdateStateType =
    'roastersDropdown'
    | 'blendDropdown'
    | 'selectedRoaster'
    | 'isRoasterSelected'
    | 'selectedBlend'
    | 'isBlendSelected';

interface FormState {
    roaster: string;
    blendName: string;
    tastingNotes: string;
    dose: string;
    yield: string;
    time: string
    rating: number;
}

type FormStateAction = 'roaster' | 'blendName' | 'tastingNotes' | 'dose' | 'yield' | 'time' | 'rating';

const initialFormState = {
    roaster: '',
    blendName: '',
    tastingNotes: '',
    dose: '',
    yield: '',
    time: '',
    rating: 0
}


export const AddBeanModal = ({isOpen, onClose, withInput, children, ...rest}: AddBeanModalProps) => {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState<FormState>(initialFormState)

    const updateState = (name: FormStateAction, value: any) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSave = () => {
        const userBean: UserBean = {
            id: new Date().toLocaleString(),
            roasterName: formState.roaster,
            blendName: formState.blendName,
            tastingNotes: formState.tastingNotes,
            recipe: {
                dose: formState.dose,
                yield: formState.yield,
                time: formState.time,
            },
            rating: formState.rating,
        };

        console.log(userBean)

        dispatch(addUserBean(userBean))
        onClose()
    }

    return (
        <ThemedModal isOpen={isOpen} close={onClose} >
            <View style={styles.titleContainer} >
                <ThemedText type={'subtitle'} >Add Your Beans</ThemedText >
                <Ionicons.Button
                    name="search"
                    size={24}
                    backgroundColor={'transparent'}
                    color={colors.tertiary}
                    onPress={() => {
                    }}
                />
            </View >

            <ThemedText
                type={'default'}
                style={styles.titleContainer}
            >
                Add your bean profile, or use the search tool above.
            </ThemedText >

            <View style={styles.content} >
                <ThemedInput
                    onValueChange={(text) => updateState('blendName', text)}
                    placeholder="Blend Name"
                    value={formState.blendName}
                />
                <ThemedInput
                    onValueChange={(text) => updateState('roaster', text)}
                    placeholder="Roaster"
                    value={formState.roaster}
                />
                <ThemedInput
                    onValueChange={(text) => updateState('tastingNotes', text)}
                    placeholder="Tasting Notes"
                    value={formState.tastingNotes}
                />
                <ThemedInput
                    onValueChange={(text) => updateState('dose', text)}
                    placeholder="Dose"
                    value={formState.dose}
                />
                <ThemedInput
                    onValueChange={(text) => updateState('yield', text)}
                    placeholder="Yield"
                    value={formState.yield}
                />
                <ThemedInput
                    onValueChange={(text) => updateState('time', text)}
                    placeholder="Time"
                    value={formState.time}
                />
                <Rating
                    type='heart'
                    ratingCount={5}
                    imageSize={40}
                    startingValue={0}
                    jumpValue={0.5}
                    onFinishRating={(rating: number) => updateState('rating', rating)}
                />
                <Button
                    title={'SAVE'}
                    color={colors.primary}
                    onPress={onSave}
                />
            </View >
        </ThemedModal >
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
        justifyContent: "space-between",
    },
    content: {
        gap: 8,
    },
});

// const roasters = useAppSelector(selectRemoteRoasters);
// const beans = useAppSelector(selectRemoteBeans);
// const [modalState, setModalState] = useState<AddBeanModalState>(initialModalState);
//
// const updateState = (name: UpdateStateType, value: any) => {
//     setModalState(prevState => ({
//         ...prevState,
//         [name]: value
//     }))
// }
//
// useEffect(() => {
//     updateState('roastersDropdown', serverRoastersToDropdown(roasters))
// }, [])
//
// const onRoasterSelect = (text: string) => {
//     const roaster = roasters.find(roaster => roaster.name === text);
//     if (!roaster) {
//         updateState('isRoasterSelected', false)
//         return;
//     }
//     const blends = beans.filter(blend => blend.roasterId === roaster.id)
//
//     updateState('blendDropdown', serverBeansToDropdown(blends));
//     updateState('selectedRoaster', text);
//     updateState('isRoasterSelected', true);
// };
//
// const onBlendSelected = (text: string) => {
//     if (!text) return
//     const blend = beans.find(bean => bean.blendName === text);
//
//     if (!blend) {
//         updateState('isBlendSelected', false);
//         return;
//     }
//     updateState('selectedBlend', text);
//     updateState('isBlendSelected', true);
// }

