import { Button, StyleSheet, View } from 'react-native';
import { THEME_COLOURS } from '@/constants/theme-colors';
import React, { useEffect } from 'react';
import { CustomTypeWriter, DialInHeading } from '@/features/dial-in/components';
import { useAppSelector } from '@/store/store';
import { ThemedDropdown } from '@/components/dropdown';
import { selectUserRecipes, selectUserPantryItems } from '@/store';
import { useCustomState } from '@/hooks';
import { pantryItemsToDropdown, userRecipesToDropdown } from '@/usecase';
import { ThemedText } from '@/components/text/themed-text';
import Animated, {
    StretchOutY,
    LinearTransition,
} from 'react-native-reanimated';
import { DialInScreenProps } from "@/features/dial-in/types";


interface GetCoffeeState {
    isShow?: boolean;
    selectedPantryItem?: string | null;
    selectedBlend?: string | null;
    isAddModalOpen?: boolean;
}

export function GetCoffeeScreen({ onNext, onBack, onExit, onShow, speak }: DialInScreenProps) {
    const userRecipes = useAppSelector(selectUserRecipes);
    const pantryItems = useAppSelector(selectUserPantryItems);

    const { state, updateState } = useCustomState<GetCoffeeState>({
        isShow: false,
        selectedPantryItem: null,
        selectedBlend: null,
        isAddModalOpen: false,
    });

    const onShowPressed = () => {
        updateState({isShow: true});
        onShow();
    }

    const onSelectPantryItem = (id: string) => {
        updateState({ selectedPantryItem: id });
    };

    const onSelectUserRecipe = (id: string) => {
        updateState({ selectedBlend: id });
    };

    useEffect(() => {
        const thingToSay = 'Firstly, I need to know what coffee you are using. You can pick from your pantry, saved recipes, or add a new blend.';
        speak(thingToSay)
    }, [])

    return (
        <View >
            {/*<AddRecipeModal*/}
            {/*    isOpen={state.isAddModalOpen?? false}*/}
            {/*    onClose={() => updateState({ isAddModalOpen: false })}*/}
            {/*    onSaveCallback={onSelectUserRecipe}*/}
            {/*/>*/}
            <DialInHeading
                onBack={onBack}
                onShow={onShowPressed}
                onExit={onExit}
            />

            <Animated.View style={styles.content} >
                {/*{(state.isSpeaking || state.isShow) &&*/}
                <CustomTypeWriter
                    text={['Firstly, I need to know what coffee you are using. You can pick from your pantry, saved recipes, or add a new blend.']}
                    type={'default'}
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
                                    data={pantryItemsToDropdown(pantryItems)}
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
                                    data={userRecipesToDropdown(userRecipes)}
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
                                color={THEME_COLOURS.primary}
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
        paddingVertical: 32,
        gap: 16,
        overflow: 'hidden',
    },
    orText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: THEME_COLOURS.tertiary,
    },
});