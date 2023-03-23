const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
    name: IS_DEV ? 'Morongo (Dev)' : 'Morongo',
    slug: 'app',
    "scheme": "morongo",
    "icon": "./assets/icon.png",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#000000"
    },
    "web": {
        "bundler": "metro"
    },
    "plugins": [
        [
            "expo-notifications",
            {
                "icon": "./assets/notification-icon.png",
                "color": "#dd9933",
                "mode": "production"
            }
        ],
        "@config-plugins/react-native-blob-util",
        "@config-plugins/react-native-pdf"
    ],
    "extra": {
        "eas": {
            "projectId": "3c3ebb49-aa4a-4674-8bdd-36876992d0b6"
        }
    },

    "updates": {
        "url": "https://u.expo.dev/3c3ebb49-aa4a-4674-8bdd-36876992d0b6"
    },
    "runtimeVersion": {
        "policy": "sdkVersion"
    },

    "owner": "morongo",
    "ios": {
        "bundleIdentifier": `app.morongo${IS_DEV ? '.dev' : ''}`,
        "supportsTablet": true
    },
    "android": {
        "package": `app.morongo${IS_DEV ? '.dev' : ''}`,
        "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
            "backgroundColor": "#000000"
        },
        "icon": "./assets/icon.png"
    },

}
