import { Button, StyleSheet, View } from 'react-native';
import { themedColors } from '@/constants/themed-colors';
import React, { useEffect } from 'react';
import { CustomTypeWriter, DialInHeading } from '@/features/dial-in/components';
import { useAppSelector } from '@/store/store';
import { DropdownData, ThemedDropdown } from '@/components/dropdown';
import { selectUserRecipes, selectUserPantryItems } from '@/store';
import { useCustomState } from '@/hooks/useCustomState';
import { AddRecipeModal } from '@/features/kitchen';
import { pantryItemsToDropdown, userRecipesToDropdown } from '@/usecase';
import { ThemedText } from '@/components/text/themed-text';
import Animated, {
    StretchOutY,
    LinearTransition,
} from 'react-native-reanimated';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';


interface GetCoffeeState {
    isShow?: boolean;
    pantryItemsDropdown?: DropdownData[];
    userRecipesDropdown?: DropdownData[];
    selectedPantryItem?: string | null;
    selectedBlend?: string | null;
    isAddModalOpen?: boolean;
}

export function GetCoffeeScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const userRecipes = useAppSelector(selectUserRecipes);
    const pantryItems = useAppSelector(selectUserPantryItems);
    const tts = useTextToSpeech();

    const { state, updateState } = useCustomState<GetCoffeeState>({
        isShow: false,
        pantryItemsDropdown: pantryItemsToDropdown(pantryItems),
        userRecipesDropdown: userRecipesToDropdown(userRecipes),
        selectedPantryItem: null,
        selectedBlend: null,
        isAddModalOpen: false,
    });

    const onShow = () => {
        updateState({isShow: true});
        tts.stop();
    }

    const onBackPressed =() => {
        tts.stop();
        onBack();
    }

    const onSelectPantryItem = (id: string) => {
        updateState({ selectedPantryItem: id });
    };

    const onSelectUserRecipe = (id: string) => {
        updateState({ selectedBlend: id });
    };

    useEffect(() => {
        updateState({
            userRecipesDropdown: userRecipesToDropdown(userRecipes),
        });
    }, [userRecipes]);

    useEffect(() => {
        const thingToSay = 'Firstly, I need to know what coffee you are using. You can pick from your pantry, saved recipes, or add a new blend.';
        tts.speak(thingToSay)
    }, [])

    return (
        <View >
            <AddRecipeModal
                isOpen={state.isAddModalOpen?? false}
                onClose={() => updateState({ isAddModalOpen: false })}
                onSaveCallback={onSelectUserRecipe}
            />
            <DialInHeading
                onBack={onBackPressed}
                onShow={onShow}
                icon={'exit'}
            />

            <Animated.View style={styles.content} >
                {/*{(state.isSpeaking || state.isShow) &&*/}
                <CustomTypeWriter
                    text={['Firstly, I need to know what coffee you are using. You can pick from your pantry, saved recipes, or add a new blend.']}
                    type={'primaryBold'}
                    speed={29}
                    isShow={state.isShow}
                >
                    <Animated.View
                        style={styles.stepContainer}
                        layout={LinearTransition}
                    >
                        {!state.selectedBlend &&
                            <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                                <ThemedDropdown
                                    placeholder={'Search Pantry'}
                                    data={state.pantryItemsDropdown}
                                    value={state.selectedPantryItem?? null}
                                    onChange={onSelectPantryItem}
                                />
                            </Animated.View >
                        }

                        {!state.selectedBlend && !state.selectedPantryItem &&
                            <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                                <ThemedText style={styles.orText} type={'defaultSemiBold'} >
                                    - OR -
                                </ThemedText >
                            </Animated.View >
                        }
                        {!state.selectedPantryItem &&
                            <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                                <ThemedDropdown
                                    placeholder={'Search Recipes'}
                                    data={state.userRecipesDropdown}
                                    value={state.selectedBlend?? null}
                                    onChange={onSelectUserRecipe}

                                />
                            </Animated.View >
                        }
                        {!state.selectedBlend && !state.selectedPantryItem &&
                            <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                                <ThemedText style={styles.orText} type={'defaultSemiBold'} >
                                    - OR -
                                </ThemedText >
                            </Animated.View >
                        }
                        <Animated.View exiting={StretchOutY} layout={LinearTransition} >
                            <Button
                                color={themedColors.primary}
                                title={state.selectedBlend || state.selectedPantryItem
                                    ? 'NEXT'
                                    : 'ADD NEW'
                                }
                                onPress={state.selectedBlend || state.selectedPantryItem
                                    ? onNext
                                    : () => updateState({ isAddModalOpen: true })
                                }
                            />
                        </Animated.View >
                    </Animated.View >
                </CustomTypeWriter >
                {/*}*/}
            </Animated.View >
        </View >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 16,
        marginVertical: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 16,
        gap: 16,
        overflow: 'hidden',
    },
    orText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: themedColors.tertiary,
    },
});