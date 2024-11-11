import React from 'react';import { ModalProps as RNModalProps } from 'react-native/Libraries/Modal/Modal';import { LayoutAnimationConfig } from 'react-native-reanimated';import { ThemedModal } from '@/components/modal';import { AddRecipe } from './modal-add-recipe';import { SearchBean } from '@/features/recipes/beans/modal-search-bean';import { FormState } from '@/features/recipes/beans/types';import { useCustomState } from '@/hooks/useCustomState';type AddRecipeModalProps = RNModalProps & {    isOpen: boolean;    onClose: () => void;    onSaveCallback?: (id: string) => void;};const initialState: FormState = {    isSearch: false,    roaster: '',    blendName: '',    tastingNotes: '',    dose: '',    yield: '',    time: '',    rating: 0,};export const RecipeModal = ({ isOpen, onClose, onSaveCallback }: AddRecipeModalProps) => {    const { state, updateState } = useCustomState<FormState>({        ...initialState,    });    return (        <ThemedModal isOpen={isOpen} close={onClose}>            <LayoutAnimationConfig skipEntering>                {state.isSearch ? (                    <SearchBean                        updateParentState={updateState}                    />                ) : (                    <AddRecipe                        parentState={state}                        updateParentState={updateState}                        close={onClose}                        onSaveCallback={onSaveCallback}                    />                )}            </LayoutAnimationConfig>        </ThemedModal>    );};