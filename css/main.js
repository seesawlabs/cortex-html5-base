import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "width": "100%",
        "height": "100%",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "hidden",
        "backgroundColor": "#000"
    },
    "body": {
        "width": "100%",
        "height": "100%",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "hidden",
        "backgroundColor": "#000"
    },
    "container": {
        "width": 1080,
        "height": 1920,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "overflow": "hidden",
        "color": "#fff"
    },
    "placeholder": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": 1080,
        "height": 1920,
        "zIndex": 20
    },
    "placeholderinvisible": {
        "opacity": 0
    }
});