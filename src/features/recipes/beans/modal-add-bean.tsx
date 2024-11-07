import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

import { ThemedInput } from '@/components/input';
import { ThemedText } from '@/components/text/themed-text';
import { themedColors } from '@/constants/themed-colors';
import { UserBean } from '@/domain';
import { FormState } from '@/features/recipes/beans/types';
import { addUserBean, useAppDispatch } from '@/store';
import { globalStyles } from '@/styles/global-styles';
import { StateType } from '@/hooks/useCustomState';

type AddBeanProps = {
    parentState: FormState;
    updateParentState: (state: StateType<FormState>) => void;
    close: () => void;
};

export function AddBean({ parentState, updateParentState, close }: AddBeanProps) {
    const dispatch = useAppDispatch();
    const onSave = () => {
        const userBean: UserBean = {
            id: new Date().toLocaleString(),
            roasterName: parentState.roaster,
            blendName: parentState.blendName?? 'unknown',
            tastingNotes: parentState.tastingNotes,
            recipe: {
                dose: parentState.dose?? 'unknown',
                yield: parentState.yield?? 'unknown',
                time: parentState.time?? 'unknown',
            },
            rating: parentState.rating,
        };

        dispatch(addUserBean(userBean));
        close();
    };

    return (
        <TouchableWithoutFeedback>
            <Animated.View
                entering={SlideInLeft.delay(50)}
                exiting={SlideOutLeft}
            >
                <Animated.View style={globalStyles.innerModal}>
                    <View style={globalStyles.modalTitle}>
                        <ThemedText type={'subtitle'}>
                            Add Your Beans
                        </ThemedText>
                        <Ionicons.Button
                            name="search"
                            size={24}
                            backgroundColor={'transparent'}
                            color={themedColors.tertiary}
                            style={{padding: 0, margin: 0}}
                            onPress={() => updateParentState({'isSearch': true})}
                        />
                    </View>

                    <ThemedText type={'default'} >
                        Add your bean profile, or use the search tool above.
                    </ThemedText>

                    <View style={styles.content}>
                        <ThemedInput
                            onValueChange={(text) =>
                                updateParentState({'blendName': text})
                            }
                            placeholder="Blend Name"
                            value={parentState.blendName!}
                        />
                        <ThemedInput
                            onValueChange={(text) =>
                                updateParentState({'roaster': text})
                            }
                            placeholder="Roaster"
                            value={parentState.roaster!}
                        />
                        <ThemedInput
                            onValueChange={(text) =>
                                updateParentState({'tastingNotes': text})
                            }
                            placeholder="Tasting Notes"
                            value={parentState.tastingNotes!}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({'dose': text})}
                            placeholder="Dose"
                            value={parentState.dose!}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({'yield': text})}
                            placeholder="Yield"
                            value={parentState.yield!}
                        />
                        <ThemedInput
                            onValueChange={(text) => updateParentState({'time': text})}
                            placeholder="Time"
                            value={parentState.time!}
                        />
                        <Rating
                            type="heart"
                            ratingCount={5}
                            imageSize={40}
                            startingValue={0}
                            jumpValue={1}
                            onFinishRating={(rating: number) =>
                                updateParentState({'rating': rating})
                            }
                        />
                        <Button
                            title={'SAVE'}
                            color={themedColors.primary}
                            onPress={onSave}
                        />
                    </View>
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 8,
    },
});
