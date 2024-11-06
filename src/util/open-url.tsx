import { Linking } from "react-native";

export function openExternalUrl(url: string | undefined | null) {
    if (!url) return
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log("Don't know how to open URI: " + url);
        }
    });
};