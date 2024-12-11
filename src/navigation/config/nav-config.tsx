import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { THEME_COLOURS } from "@/constants";
import { BannerLeft, BannerLogo, BannerRight } from "@/navigation/components/banner";
import React from "react";
import { Dimensions } from "react-native";

export const SCREEN_OPTIONS: DrawerNavigationOptions = {
    headerStyle: {
        backgroundColor: THEME_COLOURS.tertiaryBlack,
    },
    headerTintColor: '#fff',
    headerLeft: () => <BannerLeft />,
    headerTitle: () => <BannerLogo />,
    headerRight: () => <BannerRight />,
    headerTitleAlign: 'center',
    drawerPosition: 'right',
    drawerActiveBackgroundColor: THEME_COLOURS.backgroundSecondary,
    drawerStyle: {
        width: Dimensions.get("window").width * 0.85,
        backgroundColor: THEME_COLOURS.backgroundSecondary,
    }
};