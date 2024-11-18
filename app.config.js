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
            "supportsTablet": true
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
                        "./src/assets/fonts/Poppins-Regular.ttf",
                        "./src/assets/fonts/Poppins-Bold.ttf",
                        "./src/assets/fonts/Poppins-SemiBold.ttf",
                        "./src/assets/fonts/Poppins-ExtraBold.ttf"
                    ]
                }

            ],
            "expo-build-properties"
        ],
        "experiments": {},
        "extra": {
            "eas": {
                "projectId": "3f826a15-5f46-41e0-bfcd-2712498e77f6"
            }
        }
    }
}