import { ThemedView } from "@/components/ThemedView";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { themedColors } from "@/constants/themed-colors";
import React from "react";
import { CustomTypeWriter } from "@/features/dial-in/components/CustomTypeWriter";
import { ThemedText } from "@/components/text/themed-text";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectPortafilter, setPortafilter } from "@/store/slice/dial-in-slice";
import { CONSTANTS } from "@/features/dial-in/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DialInHeading } from "@/features/dial-in/components/dial-in-heading";

export function GetMachineScreen({onNext, onBack}: { onNext: () => void, onBack: () => void }) {
    const portafilter = useAppSelector(selectPortafilter);
    const dispatch = useAppDispatch();
    const [selected, setSelected] = React.useState('')
    const [show, setShow] = React.useState(false);
    function onShow() {
        setShow(true);
    }
    const onSelect = () => {
        dispatch(setPortafilter(selected));
        onNext()
    }

    return (
        <View >
            <DialInHeading onBack={onBack} onShow={onShow} icon={'back'} />
            <View style={styles.content}>
                <CustomTypeWriter
                    text={CONSTANTS.qTwo}
                    type={'primaryBold'}
                    speed={20}
                    isShow={show}
                >
                    <View style={styles.stepContainer} >
                        {CONSTANTS.portafilterOptions.map(option => {
                            return (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.singleOptionContainer}
                                    onPress={() => setSelected(option)} >
                                    <View style={styles.outerCircle} >
                                        {selected === option ? (
                                            <View style={styles.innerCircle} />
                                        ) : null}
                                    </View >
                                    <ThemedText >{option}</ThemedText >
                                </TouchableOpacity >
                            );
                        })}
                    </View >
                    <View style={styles.stepContainer} >
                        <Button title={'Next'} color={themedColors.primary} onPress={onSelect} />
                    </View >
                </CustomTypeWriter >
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 0,
        marginBottom: 16,
        marginTop: 16,
    },
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionContainer: {
        width: '90%',
    },
    singleOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        margin: 5,
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
    iconWrapper: {
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginTop: 8
    },
    content: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 16,
        gap: 16,
        overflow: 'hidden',
    },
});
