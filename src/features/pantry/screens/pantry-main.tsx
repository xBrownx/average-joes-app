import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CurrentStash } from "@/features/pantry/components/current-stash";
import { WishList } from "@/features/pantry/components/wish-list";
import { PastLoves } from "@/features/pantry/components/past-loves";
import { ThemedText } from "@/components/text";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export function PantryMain() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    return (
        <View style={styles.container}>
            <View style={{flex: 1, height: '50%', width: '100%'}}>
                <View style={styles.currentStash}>
                    <CurrentStash />
                </View>
            </View>
            <View style={{flex: 1}}>
                <View style={styles.wishList}>
                    <WishList />
                </View>
                <View style={styles.pastLoves}>
                    <PastLoves />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: "100%",
        width: '100%',
        padding: 0,
    },
    currentStash: {
        paddingHorizontal: 45,
    },
    wishList: {
        flex: 1,
    },
    pastLoves: {
        flex: 1
    },
})