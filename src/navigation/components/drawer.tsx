import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';
import { DrawItem } from './drawer-item';
import { ThemedText } from "@/components/text";
import Animated, {
    LinearTransition,
} from 'react-native-reanimated';


export function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
    const topImageUri = require('@/assets/images/BANNER_PRODUCT_MOBILE.webp');
    const bottomImageUri = require('@/assets/images/Lockup_for_menu.png');

    const [topImageHeight, setTopImageHeight] = React.useState(0);
    const [bottomImageHeight, setBottomImageHeight] = React.useState(0);

    const onTopLoadImage = (imgWidth: number) => {
        const img = Image.resolveAssetSource(topImageUri);
        setTopImageHeight(
            img.height * (imgWidth / img.width),
        );
    };

    const onBottomLoadImage = (imgWidth: number) => {
        const img = Image.resolveAssetSource(bottomImageUri);
        setBottomImageHeight(
            img.height * (imgWidth / img.width),
        );
    };

    return (
        <View style={styles.drawerContainer} >
            <View style={styles.bannerImage} >
                <Image
                    source={topImageUri}
                    style={{
                        width: '100%',
                        height: topImageHeight,
                        borderRadius: 5,
                    }}
                    onLayout={(layout) => {
                        onTopLoadImage(layout.nativeEvent.layout.width);
                    }}
                />
            </View >
            <Animated.View
                style={styles.drawList}
                layout={LinearTransition}
            >
                <DrawItem title={'DIAL-IN'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'JOEVEMBER OFFERS'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'BEST SELLERS'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'BUNDLES'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'ACCESSORIES'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'MACHINES'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'COFFEE'} ><ThemedText ></ThemedText ></DrawItem >
                <DrawItem title={'LEARN'} ><ThemedText ></ThemedText ></DrawItem >
                <Image
                    source={bottomImageUri}
                    style={{
                        width: '100%',
                        height: bottomImageHeight,
                        marginTop: 16,
                    }}
                    onLayout={(layout) => {
                        onBottomLoadImage(layout.nativeEvent.layout.width);
                    }}
                />
            </Animated.View >
        </View >
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        padding: 16,
        paddingTop: 70,
    },
    bannerImage: {},
    drawList: {},
});