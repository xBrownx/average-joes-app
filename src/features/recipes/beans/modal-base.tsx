import React from 'react';import { ModalProps as RNModalProps } from 'react-native/Libraries/Modal/Modal';import { LayoutAnimationConfig } from 'react-native-reanimated';import { ThemedModal } from '@/components/modal';import { AddBean } from '@/features/recipes/beans/modal-add-bean';import { SearchBean } from '@/features/recipes/beans/modal-search-bean';import { FormState, FormStateAction } from '@/features/recipes/beans/types';import { useCustomState } from '@/hooks/useCustomState';type AddBeanModalProps = RNModalProps & {    isOpen: boolean;    onClose: () => void;};const initialState: FormState = {    isSearch: false,    roaster: '',    blendName: '',    tastingNotes: '',    dose: '',    yield: '',    time: '',    rating: 0,};export const BeanModal = ({ isOpen, onClose }: AddBeanModalProps) => {    const { state, updateState } = useCustomState<FormState, FormStateAction>({        ...initialState,    });    return (        <ThemedModal isOpen={isOpen} close={onClose}>            <LayoutAnimationConfig skipEntering>                {state.isSearch ? (                    <SearchBean                        updateParentState={updateState}                    />                ) : (                    <AddBean                        parentState={state}                        updateParentState={updateState}                        close={onClose}                    />                )}            </LayoutAnimationConfig>        </ThemedModal>    );};