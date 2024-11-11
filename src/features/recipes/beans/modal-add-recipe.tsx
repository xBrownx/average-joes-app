import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import Animated, { FadeIn, FadeOut, LinearTransition, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

import { ThemedInput } from '@/components/input';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import { UserRecipe } from '@/domain';
import { FormState } from '@/features/recipes/beans/types';
import { addUserRecipe, useAppDispatch } from '@/store';
import { globalStyles } from '@/styles/global-styles';
import { StateType, useCustomState } from '@/hooks/useCustomState';
import { ThemedCheckbox } from '@/components/checkbox';
import { ThemedDatePicker } from '@/components/date-picker';
import { dateObjToString } from '@/usecase/date-usecase';
import uuid from 'react-native-uuid';

type AddBeanProps = {
    parentState: FormState;
    updateParentState: (state: StateType<FormState>) => void;
    close: () => void;
    onSaveCallback?: (id: string) => void;
};

interface AddBeanState {
    isAddPantry?: boolean;
    roastDate?: string;
    expiryDate?: string;
}

export function AddRecipe({ parentState, updateParentState, close, onSaveCallback }: AddBeanProps) {
    const dispatch = useAppDispatch();

    const { state, updateState } = useCustomState<AddBeanState>({
        isAddPantry: false,
        roastDate: '',
        expiryDate: '',
    });

    const onSave = () => {
        const userRecipe: UserRecipe = {
            id: uuid.v4().toString(),
            roasterName: parentState.roaster,
            blendName: parentState.blendName ?? 'unknown',
            tastingNotes: parentState.tastingNotes,
            recipe: {
                dose: parentState.dose ?? 'unknown',
                yield: parentState.yield ?? 'unknown',
                time: parentState.time ?? 'unknown',
            },
            rating: parentState.rating,
        };

        dispatch(addUserRecipe(userRecipe));
        if (onSaveCallback)
            onSaveCallback(userRecipe.id);
        close();
    };

    return (
        <TouchableWithoutFeedback >
            <Animated.View
                entering={SlideInLeft.delay(50)}
                exiting={SlideOutLeft}
                layout={LinearTransition}
            >
                <Animated.View
                    style={globalStyles.innerModal}
                    layout={LinearTransition.delay(200)}
                >
                    <View style={globalStyles.modalTitle} >
                        <ThemedText type={'subtitle'} >
                            Add a New Blend
                        </ThemedText >
                        <Ionicons.Button
                            name="search"
                            size={24}
                            backgroundColor={'transparent'}
                            color={themedColors.tertiary}
                            style={{ padding: 0, margin: 0 }}
                            onPress={() => updateParentState({ 'isSearch': true })}
                        />
                    </View >

                    <ThemedText type={'default'} >
                        Add your blend profile, or use the search tool above.
                    </ThemedText >

                    <View
                        style={styles.content}
                    >
                        <ThemedInput
                            onValueChange={(text) =>
                                updateParentState({ 'blendName': text })
                            }
                            placeholder="Blend Name"
                            value={parentState.blendName!}
                        />
                        <ThemedInput
                            onValueChange={(text) =>
                                updateParentState({ 'roaster': text })
                            }
                            placeholder="Roaster"
                            value={parentState.roaster!}
                        />
                        <ThemedInput
                            onValueChange={(text) =>
                                updateParentState({ 'tastingNotes': text })
                            }
                            placeholder="Tasting Notes"
                            value={parentState.tastingNotes!}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({ 'dose': text })}
                            placeholder="Dose"
                            value={parentState.dose!}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({ 'yield': text })}
                            placeholder="Yield"
                            value={parentState.yield!}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({ 'time': text })}
                            placeholder="Time"
                            value={parentState.time!}
                        />
                        <ThemedCheckbox
                            checked={state.isAddPantry!}
                            setChecked={() => updateState({ isAddPantry: !state.isAddPantry })}
                            label="Add to Pantry?"
                        />
                        {state.isAddPantry &&
                            <Animated.View
                                style={styles.content}
                                entering={FadeIn.delay(300)}
                                exiting={FadeOut}
                                >

                                <ThemedDatePicker
                                    onValueChange={(date: Date) => updateState({ roastDate: dateObjToString(date) })}
                                    placeholder="Roast Date"
                                    value={state.roastDate ?? ''}
                                />
                                <ThemedDatePicker
                                    onValueChange={(date: Date) => updateState({ expiryDate: dateObjToString(date) })}
                                    placeholder="Expiry Date"
                                    value={state.expiryDate ?? ''}
                                />
                            </Animated.View >
                        }
                        <Animated.View layout={LinearTransition.delay(200)} >
                            <Rating
                                type="heart"
                                ratingCount={5}
                                imageSize={40}
                                startingValue={0}
                                jumpValue={1}
                                onFinishRating={(rating: number) =>
                                    updateParentState({ 'rating': rating })
                                }
                            />
                        </Animated.View >
                        <Animated.View layout={LinearTransition.delay(200)} >
                            <Button
                                title={'SAVE'}
                                color={themedColors.primary}
                                onPress={onSave}
                            />
                        </Animated.View >
                    </View >
                </Animated.View >
            </Animated.View >
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 8,
    },
});
