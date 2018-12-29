import React, { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.imgContainer}>
        <View style={{ opacity: this.props.show ? 1 : 0, marginTop: 120 }}>
          <Text style={styles.text}>Tic Tac Toe</Text>
        </View>
        <View style={{ opacity: this.props.show ? 1 : 0, marginTop: 60 }}>
          <Image source={require("../assets/loading.gif")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 40,
    justifyContent: "center",
    color: "#111",
  }
});
