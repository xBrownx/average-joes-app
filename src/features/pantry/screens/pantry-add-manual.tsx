import { View, StyleSheet, TouchableOpacity } from "react-native";
import { usePantryScreenContext } from "@/features/pantry/context/pantry-screen-context";
import { ThemedText } from "@/components/text";
import { Camera } from "@/components/camera/camera";
import TakePhoto from "@/assets/svg/CAMERA ICON.svg";
import { ThemedButton } from "@/components/button";
import { THEME_COLOURS } from "@/constants";
import { ThemedInput } from "@/components/input";

export function PantryAddManual() {
    const {setScreen} = usePantryScreenContext();

    function onAddBean() {
        setScreen('main')
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.exitContainer}>
                    <TouchableOpacity
                        style={styles.exitEllipse}
                        onPress={() => setScreen('main')}
                    >
                        <ThemedText style={{color: 'black'}}>
                            X
                        </ThemedText>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentWrapper}>
                    <ThemedText style={styles.title} type={'default'}>
                        ADD BEANS
                    </ThemedText>
                    <View style={styles.formContainer}>
                        <ThemedInput
                            placeholder={"ROASTER"}
                            value={""}
                            onValueChange={undefined}>
                        </ThemedInput>
                        <ThemedInput
                            placeholder={"ROAST DATE"}
                            value={""}
                            onValueChange={undefined}>
                        </ThemedInput>
                        <ThemedInput
                            placeholder={"BLEND"}
                            value={""}
                            onValueChange={undefined}>
                        </ThemedInput>
                        <ThemedInput
                            placeholder={"RECIPE"}
                            value={""}
                            onValueChange={undefined}>
                        </ThemedInput>
                        <ThemedInput
                            type={'multi-line'}
                            placeholder={"NOTES"}
                            value={""}
                            onValueChange={undefined}>
                        </ThemedInput>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ThemedButton
                            type={'variant'}
                            onPress={onAddBean}
                        >
                            DONE
                        </ThemedButton>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingBottom: 40,

    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: THEME_COLOURS.tertiary,
        borderRadius: 28,
    },
    exitContainer: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 16,
    },
    exitEllipse: {
        backgroundColor: '#FFF6D6',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
    },
    contentWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    formContainer: {
        flexDirection: 'column',
        gap: 8,
    },

    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 35,
        paddingHorizontal: 50,
    },
    addButton: {
        borderRadius: 20,
        height: 40,
        paddingTop: 2
    }
})