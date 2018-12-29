import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from "react-native";
import Loading from "./Loading";
import TicTacToe from "./TicTacToe";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isLoaded: false
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({isLoading: false, isLoaded: true})
    }, 5000);
  }


  render() {
    return (
      <View>
        <Loading show={this.state.isLoading}/>
        <TicTacToe show={this.state.isLoading}/>
      </View>
    );
  }
}
