import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "container": {
        "backgroundColor": "#fff",
        "color": "#000"
    },
    "container invisible": {
        "display": "none"
    },
    "container imgcopy": {
        "position": "absolute",
        "bottom": 0
    },
    "container mainImg": {
        "width": 1080,
        "height": 1235,
        "backgroundSize": "cover",
        "backgroundPosition": "center center",
        "left": 0,
        "top": 397,
        "position": "absolute",
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "container overlay": {
        "width": 1080,
        "height": 1920,
        "overflow": "hidden",
        "position": "absolute",
        "top": 0,
        "left": 0,
        "zIndex": 10
    },
    "container imgslide": {
        "position": "absolute",
        "top": 424,
        "width": 1080,
        "left": 0,
        "height": 1207
    },
    "container bar": {
        "background": "rgba(0,0,0,0.5)",
        "top": 1500,
        "left": 138,
        "position": "absolute",
        "zIndex": 1,
        "color": "#fff",
        "fontSize": 38,
        "fontFamily": "HelveticaNeueLTStd",
        "height": 138,
        "lineHeight": 5,
        "paddingTop": 0.7,
        "paddingRight": 1,
        "paddingBottom": 0.7,
        "paddingLeft": 1,
        "width": "100%"
    },
    "container avatar": {
        "background": "#fff",
        "height": 138,
        "width": 138,
        "top": 1500,
        "left": 0,
        "position": "absolute",
        "zIndex": 1,
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "backgroundSize": "contain"
    }
});