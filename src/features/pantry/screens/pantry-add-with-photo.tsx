import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "@/components/camera/camera";
import TakePhoto from '@/assets/svg/CAMERA ICON.svg'
import { THEME_COLOURS } from "@/constants";
import { ThemedButton } from "@/components/button";
import { ThemedText } from "@/components/text";
import { usePantryScreenContext } from "@/features/pantry/context/pantry-screen-context";

export function PantryAddWithPhoto() {
    const {setScreen} = usePantryScreenContext();
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
                    <View style={styles.cameraContainer}>
                        <Camera />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity>
                            <TakePhoto />
                        </TouchableOpacity>
                        <ThemedButton
                            textType={'large'}
                            type={'dark'}
                            style={styles.addButton}
                            onPress={() => setScreen('add-manual')}
                        >
                            ADD MANUALLY
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
        gap: 25,
    },
    cameraContainer: {
        flex: 1,
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 35,
        paddingHorizontal: 20,
    },
    addButton: {
        borderRadius: 20,
        height: 40,
        paddingTop: 2
    }
})