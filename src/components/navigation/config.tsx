import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { themedColors } from "@/constants";
import { BannerLeft, BannerLogo, BannerRight } from "@/components/navigation/banner";
import React from "react";
import { Dimensions } from "react-native";

export const SCREEN_OPTIONS: DrawerNavigationOptions = {
    headerStyle: {
        backgroundColor: themedColors.backgroundDark,
    },
    headerTintColor: '#fff',
    headerLeft: () => <BannerLeft />,
    headerTitle: () => <BannerLogo />,
    headerRight: () => <BannerRight />,
    headerTitleAlign: 'center',
    drawerPosition: 'right',
    drawerActiveBackgroundColor: themedColors.backgroundSecondary,
    drawerStyle: {
        width: Dimensions.get("window").width * 0.85,
        backgroundColor: themedColors.backgroundSecondary,
    }
};