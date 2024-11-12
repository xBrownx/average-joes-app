import { useState } from 'react';export type StateType<ACTION> = {    [key in keyof ACTION]: any;};type CustomState<STATE> = {    state: STATE,    updateState: (actions: StateType<STATE>) => void,}export function useCustomState<STATE>(initialValue: STATE): CustomState<STATE> {    const [state, setState] = useState<STATE>(initialValue);    function updateState(actions: StateType<STATE>) {        setState(prevState => ({            ...prevState,            ...actions,            }        ))    }    return {state, updateState};}