import React from "react";
import { Component } from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./components/HomeScreen";

export default class App extends Component {

  render() {
    return (
      <View style={styles.space}>
        <HomeScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  space: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
