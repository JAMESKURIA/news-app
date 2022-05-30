// {
//   "expo": {
//     "name": "peter-news-app",
//     "slug": "peter-news-app",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/icon.png",
//     "userInterfaceStyle": "light",
//     "splash": {
//       "image": "./assets/splash.png",
//       "resizeMode": "contain",
//       "backgroundColor": "#ffffff"
//     },
//     "updates": {
//       "fallbackToCacheTimeout": 0
//     },
//     "assetBundlePatterns": [
//       "**/*"
//     ],
//     "ios": {
//       "supportsTablet": true
//     },
//     "android": {
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/adaptive-icon.png",
//         "backgroundColor": "#FFFFFF"
//       }
//     },
//     "web": {
//       "favicon": "./assets/favicon.png"
//     }
//   }
// }

import "dotenv/config";

export default {
  expo: {
    name: "peter-news-app",
    slug: "peter-news-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      // bundleIdentifier: "com.nickjames.hausa",
      // config: {
      //   googleMapsApiKey: process.env.API_KEY,
      // },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      // package: "com.nickjames.hausa",
      // config: {
      //   googleMaps: {
      //     apiKey: process.env.API_KEY,
      //   },
      // },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      // apiKey: process.env.API_KEY,
      // authDomain: process.env.AUTH_DOMAIN,
      // projectId: process.env.PROJECT_ID,
      // storageBucket: process.env.STORAGE_BUCKET,
      // messagingSenderId: process.env.MESSAGING_SENDER_ID,
      // appId: process.env.APP_ID,
      x_hasura_admin_secret: process.env.X_HASURA_ADMIN_SECRET,
    },
    description: "",
  },
};
