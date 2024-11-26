module.exports = {
    "expo": {
        "name": "AverageJoes",
        "slug": "AverageJoes",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./src/assets/images/icon.png",
        "scheme": "average-joes",
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./src/assets/images/small-logo.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff"
        },
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.xbrownx.AverageJoes",
            "googleServicesFile": "./GoogleService-Info.plist",
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./src/assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff"
            },
            "googleServicesFile": process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
            "package": "com.xbrownx.AverageJoes"
        },
        "web": {
            "bundler": "metro",
            "output": "static",
            "favicon": "./src/assets/images/favicon.png"
        },
        "plugins": [
            "@react-native-google-signin/google-signin",
            "@react-native-firebase/app",
            "@react-native-firebase/auth",
            "expo-router",
            [
                "expo-font",
                {
                    "fonts": [
                        "node_modules/@expo-google-fonts/poppins/Poppins_100Thin.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_200ExtraLight.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_300Light.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_400Regular.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_500Medium.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_600SemiBold.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_700Bold.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_800ExtraBold.ttf",
                        "node_modules/@expo-google-fonts/poppins/Poppins_900Black.ttf",
                    ]
                }

            ],
            ["expo-build-properties",
                {
                    "ios": {
                        "useFrameworks": "static"
                    }
                }
            ]
        ],
        "experiments": {},
        "extra": {
            "eas": {
                "projectId": "3f826a15-5f46-41e0-bfcd-2712498e77f6"
            }
        }
    }
}