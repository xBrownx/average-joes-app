import { ThemedScreen } from "@/components/layout/Themed-Screen";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/text";
import { THEME_COLOURS } from "@/constants";
import { TargetYield } from "@/features/brew/components/target-yield";
import { ThemedButton } from "@/components/button";
import { BrewTimer } from "@/features/brew/components/timer";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export default function BrewCoreScreen() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    return (
        <ThemedScreen>
            <View style={styles.exitContainer}>
                {/*<TouchableOpacity*/}
                {/*    style={styles.exitEllipse}*/}
                {/*    onPress={() => navigation.goBack()}*/}
                {/*>*/}
                {/*    <ThemedText style={{color: 'black'}}>*/}
                {/*        {'<'}*/}
                {/*    </ThemedText>*/}
                {/*</TouchableOpacity>*/}
            </View>
            <View style={styles.container}>
                <View style={styles.textWrapper}>
                    <ThemedText type={'subtitle'} style={styles.title}>
                        Let's pull a shot
                    </ThemedText>
                    <View style={styles.subtitleWrapper}>
                        <ThemedText type={'default'} style={styles.subtitle}>
                            When you are ready to brew;
                        </ThemedText>
                        <ThemedText type={'default'} style={styles.subtitle}>
                            Start the timer at the same time as pulling your shot.
                        </ThemedText>
                    </View>
                </View>
                <View style={styles.timerWrapper}>
                    <BrewTimer />
                </View>
                <View style={styles.targetWrapper}>
                    <TargetYield />
                </View>

                <View style={styles.settingsContainer}>
                    <ThemedText type={'default'} style={styles.subtitle}>
                        Tap to change
                    </ThemedText>
                    <View style={styles.settingWrapper}>
                        <View style={styles.setting}>
                            <ThemedText type={'subtitle'} style={styles.settingLabel}>
                                MACHINE
                            </ThemedText>
                            <ThemedButton textType={'small'}>
                                SOME MACHINE
                            </ThemedButton>
                        </View>
                        <View style={styles.setting}>
                            <ThemedText type={'subtitle'} style={styles.settingLabel}>
                                GRINDER
                            </ThemedText>
                            <ThemedButton textType={'small'}>
                                GRINDER SETTING
                            </ThemedButton>
                        </View>
                    </View>

                </View>
            </View>
        </ThemedScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        paddingBottom: 40,
        gap: 20,
    },
    exitContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
    },
    exitEllipse: {
        backgroundColor: '#FFF6D6',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 8,
        margin: 0,
    },
    textWrapper: {
        gap: 12
    },
    title: {
        textAlign: "center",
        fontSize: 22
    },
    subtitleWrapper: {
        alignItems: "center",
    },
    subtitle: {
        fontSize: 10,
        lineHeight: 14,
        textAlign: "center"
    },
    timerWrapper: {
        flex: 1,
    },
    targetWrapper: {
        paddingHorizontal: 20,
    },
    settingsContainer: {
        flexDirection: "column",
        gap: 8,
    },
    settingWrapper: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        gap: 32,
    },
    setting: {
        flex: 1,
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
    },
    settingLabel: {
        fontSize: 18,
    },

})