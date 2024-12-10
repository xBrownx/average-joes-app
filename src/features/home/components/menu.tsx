import { Image, StyleSheet, View } from "react-native";
import { MenuItem } from "@/components/menu-item/menu-item";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ConfirmModal } from '@/features/brew/confirm-modal';
import { useState } from 'react';

export function Menu() {
    const navigation = useNavigation<DrawerNavigationProp<any>>();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const onCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    }

    const onMenuItemPress = (itemId: string) => {
        console.log(itemId, 'pressed');
    }

    return (
        <View style={styles.container}>
            <ConfirmModal isOpen={confirmModalOpen} onClose={onCloseConfirmModal}/>
            <View style={styles.row}>
                <MenuItem
                    heading={'BREW'}
                    onPress={() => setConfirmModalOpen(true)}
                >
                    <Image
                        source={require('../assets/icon-brew.png')}
                        style={{marginLeft: 12}}
                    />
                </MenuItem>
                <MenuItem
                    heading={'PANTRY'}
                    onPress={() => navigation.navigate('pantry' as never, { enterDir: 'right' } as any)}
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
                    onPress={() => navigation.navigate('learn' as never)}
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