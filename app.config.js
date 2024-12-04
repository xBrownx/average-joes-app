module.exports = {
    "expo": {
        "name": "AverageJoes",
        "slug": "AverageJoes",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./src/assets/images/favicon.png",
        "scheme": "average-joes",
        "userInterfaceStyle": "automatic",
        "splash": {
            "image": "./src/assets/images/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#000000"
        },
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.xbrownx.AverageJoes",
            "googleServicesFile": "./GoogleService-Info.plist",
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./src/assets/images/favicon.png",
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
                        "node_modules/@expo-google-fonts/kalam/Kalam_300Light.ttf",
                        "node_modules/@expo-google-fonts/kalam/Kalam_400Regular.ttf",
                        "node_modules/@expo-google-fonts/kalam/Kalam_700Bold.ttf",
                    ]
                }

            ],
            ["expo-build-properties",
                {
                    "ios": {
                        "useFrameworks": "static"
                    }
                }
            ],
            ["expo-camera",
                {
                    "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
                    "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
                    "recordAudioAndroid": true,
                },
            ],
        ],
        "experiments": {},
        "extra": {
            "eas": {
                "projectId": "3f826a15-5f46-41e0-bfcd-2712498e77f6"
            }
        }
    }
}