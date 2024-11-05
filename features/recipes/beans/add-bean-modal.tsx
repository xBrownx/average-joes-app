import {
    Button, LayoutAnimation,
    ModalProps as RNModalProps,
    StyleSheet, TouchableWithoutFeedback,
    View
} from 'react-native';
import colors from "@/components/colors";
import React, { useEffect, useState } from "react";
import DropdownComponent, { DropdownData } from "@/components/dropdown/dropdown";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
    addUserBean,
} from "@/store/slice/local-data-slice";
import { UserBean } from "@/domain";
import { ThemedText } from "@/components/text/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Rating } from "react-native-ratings";
import { ThemedModal } from "@/components/modal";
import { ThemedInput } from "@/components/input";
import { FadeIn, FadeOut, LayoutAnimationConfig, LinearTransition, StretchInY } from "react-native-reanimated";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import { serverBeansToDropdown, serverRoastersToDropdown } from "@/usecase";
import { selectRemoteBeans, selectRemoteRoasters } from "@/store/slice/remote-data-slice";

type AddBeanModalProps = RNModalProps & {
    isOpen: boolean;
    onClose: () => void;
    withInput?: boolean;
};

interface SearchBeanState {
    roasters: DropdownData[],
    selectedRoaster: string,
    selectedRoasterId: string,
    blends: DropdownData[],
    selectedBlendId: string,
}

interface FormState {
    isSearch: boolean;
    roaster: string;
    blendName: string;
    tastingNotes: string;
    dose: string;
    yield: string;
    time: string
    rating: number;
}

type FormStateAction = 'isSearch' | 'roaster' | 'blendName' | 'tastingNotes' | 'dose' | 'yield' | 'time' | 'rating';

const initialFormState: FormState = {
    isSearch: false,
    roaster: '',
    blendName: '',
    tastingNotes: '',
    dose: '',
    yield: '',
    time: '',
    rating: 0
}

type AddBeanProps = {
    formState: FormState,
    updateState: (name: FormStateAction, value: any) => void,
    onSave?: () => void
    onSaveSearch?: () => void
}

function AddBean({formState, updateState, onSave}: AddBeanProps) {
    return (
        <TouchableWithoutFeedback>
            <Animated.View entering={SlideInLeft.delay(50)} exiting={SlideOutLeft}>
                <Animated.View style={styles.modalInner}>
                    <View style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>Add Your Beans</ThemedText>
                        <Ionicons.Button
                            name="search"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.tertiary}
                            onPress={() => updateState('isSearch', true)}
                        />
                    </View>

                    <ThemedText
                        type={'default'}
                        style={styles.titleContainer}
                    >
                        Add your bean profile, or use the search tool above.
                    </ThemedText>

                    <View style={styles.content}>
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
                            jumpValue={1}
                            onFinishRating={(rating: number) => updateState('rating', rating)}
                        />
                        <Button
                            title={'SAVE'}
                            color={colors.primary}
                            onPress={onSave}
                        />
                    </View>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

function SearchBean({formState, updateState, onSaveSearch}: AddBeanProps) {
    const roasters = serverRoastersToDropdown(useAppSelector(selectRemoteRoasters));
    const allBlends = useAppSelector(selectRemoteBeans);
    const [state, setState] = useState<SearchBeanState>({
        roasters: roasters,
        selectedRoaster: '',
        selectedRoasterId: '',
        blends: [],
        selectedBlendId: '',
    })

    const onRoasterSelect = (id: string) => {
        const filteredBlends = allBlends.filter(b => b.roasterId === id);
        if (!filteredBlends) return
        setState(prevState => ({
            ...prevState,
            selectedRoaster: roasters.find(roaster => roaster.value === id)?.value ?? '',
            blends: serverBeansToDropdown(filteredBlends)
        }))
    }

    const onSave = () => {

    }

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            selectedRoaster: '',
            selectedRoasterId: '',
            selectedBlendId: '',
            blends: []
        }))
    }, [])

    useEffect(() => {
        LayoutAnimation.easeInEaseOut();
    }, [state])


    return (
        <TouchableWithoutFeedback>
            <Animated.View entering={SlideInRight.delay(50)} exiting={SlideOutRight}>
                <Animated.View layout={LinearTransition} style={styles.modalInner}>
                    <View style={styles.titleContainer}>
                        <ThemedText type={'subtitle'}>Search For a Bean</ThemedText>
                        <Ionicons.Button
                            name="arrow-back"
                            size={24}
                            backgroundColor={'transparent'}
                            color={colors.tertiary}
                            onPress={() => updateState('isSearch', false)}
                        />
                    </View>
                    <ThemedText
                        type={'default'}
                        style={styles.titleContainer}
                    >
                        Add your bean profile, or use the search tool above.
                    </ThemedText>

                    <View style={styles.content}>

                        <DropdownComponent

                            placeholder="Roaster"
                            data={state.roasters}
                            onChange={(value: string) => onRoasterSelect(value)}
                        />
                        {state.blends.length > 0 &&
                            <Animated.View entering={FadeIn}>
                                <DropdownComponent
                                    onChange={(value) => {
                                    }}
                                    data={state.blends}
                                    placeholder="Blend Name"
                                />
                            </Animated.View>
                        }
                        <Animated.View layout={LinearTransition}>
                            <Button
                                title={'SAVE'}
                                color={colors.primary}
                                onPress={onSaveSearch}
                            />
                        </Animated.View>
                    </View>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
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
        <ThemedModal isOpen={isOpen} close={onClose}>
            <LayoutAnimationConfig skipEntering>
                {formState.isSearch
                    ? <SearchBean formState={formState} updateState={updateState}
                                  onSaveSearch={() => updateState('isSearch', false)} />
                    : <AddBean formState={formState} updateState={updateState} onSave={onSave} />
                }
            </LayoutAnimationConfig>
        </ThemedModal>
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
    modalInner: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 8,
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

