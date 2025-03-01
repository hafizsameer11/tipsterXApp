import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type props = {
    videoId: string;
    setheight?:any;
    setwidth?:any;
}
const Iframe = ({ videoId , setheight ,setwidth }:props) => {

  return (
    <View style={[styles.container, { width: setwidth || "100%", height: setheight || 250 }]}>
      <WebView
        source={{ html: `${videoId}` }}
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
  },
  video: {
    flex: 1,
  },
});

export default Iframe;