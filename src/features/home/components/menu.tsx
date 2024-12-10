import { Image, StyleSheet, View } from "react-native";
import { THEME_COLOURS } from "@/constants";
import { ThemedText } from "@/components/text";
import { MenuItem } from "@/components/menu-item/menu-item";
import iconBrew from '../assets/rating.svg'
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export function Menu() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const onMenuItemPress = (itemId: string) => {
        console.log(itemId, 'pressed');
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <MenuItem
                    heading={'BREW'}
                    onPress={() => navigation.navigate('brew' as never)}
                >
                    <Image
                        source={require('../assets/icon-brew.png')}
                        style={{marginLeft: 12}}
                    />
                </MenuItem>
                <MenuItem
                    heading={'PANTRY'}
                    onPress={() => navigation.navigate('pantry' as never)}
                >
                    <Image
                        source={require('../assets/icon-pantry.png')}
                        style={styles.image}
                    />
                </MenuItem>
            </View>
            <View style={styles.row}>
                <MenuItem
                    heading={'LEARN'}
                    onPress={() => onMenuItemPress('learn')}
                >
                    <Image
                        source={require('../assets/icon-learn.png')}
                        style={styles.image}
                    />
                </MenuItem>
                <MenuItem
                    heading={'SHOP'}
                    onPress={() => onMenuItemPress('shop')}
                >
                    <Image
                        source={require('../assets/icon-shop.png')}
                        style={styles.image}
                    />
                </MenuItem>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 22,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'scale-down',
    }
})