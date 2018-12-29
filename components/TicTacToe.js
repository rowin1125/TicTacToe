import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1,
      currentPLayerMove: "1",
      scoreP1: 0,
      scoreP2: 0
    };
  }

  componentDidMount = () => {
    this.initGame();
  };

  initGame = () => {
    this.setState({ gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], currentPlayer: 1, currentPLayerMove: "1" });
  };

  getWinner = () => {
    const num_tiles = 3;
    arr = this.state.gameState;
    var sum;

    // Check rows for winner
    for (var i = 0; i < num_tiles; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check rows for winner
    for (var i = 0; i < num_tiles; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // check diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // there are no winners
    return 0;
  };

  displayCurrentPlayer = currentPlayer => {
    if (currentPlayer == 1) {
      this.setState({ currentPLayerMove: "2" });
    } else if (currentPlayer == -1) {
      this.setState({ currentPLayerMove: "1" });
    }
  };

  onTilePress = (row, col) => {
    // make sure the tile isnt used more than once
    var value = this.state.gameState[row][col];
    if (value !== 0) return;

    // grab current player
    var currentPlayer = this.state.currentPlayer;

    // Update tile based on active player
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    // Switch player after turn
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });
    this.displayCurrentPlayer(this.state.currentPlayer);

    // check for winners

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("PLayer 1 is the winner");
      this.setState({
        scoreP1: this.state.scoreP1 + 1
      });
      this.initGame();
    } else if (winner == -1) {
      Alert.alert("PLayer 2 is the winner");
      this.setState({
        scoreP2: this.state.scoreP2 + 1
      });
      this.initGame();
    }
  };

  // Reset Score
  resetScore = () => {
    this.setState({
      scoreP1: 0,
      scoreP2: 0
    });
    Alert.alert("Score resetted")
  };

  onNewgamePress = () => {
    this.initGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={{ opacity: this.props.show ? 0 : 1, marginTop: 46 }}>
        <View style={styles.container}>
          <Text style={styles.currentPlayer}>Its player {this.state.currentPLayerMove} its turn</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {}]}>
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 50 }} />
          <View style={{ flexDirection: "row"}}>
            <Button title="New Game" onPress={this.onNewgamePress} />
            <Button title="Reset Score" onPress={this.resetScore} />
          </View>
          <View style={styles.container}>
            <Text style={styles.score}>Score:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.score}>Player 1: {this.state.scoreP1}</Text>
              <Text style={styles.score}> || </Text>
              <Text style={styles.score}> Player 2: {this.state.scoreP2}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  tile: {
    borderWidth: 6,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  tileX: {
    color: "red",
    fontSize: 70
  },
  tileO: {
    color: "green",
    fontSize: 70
  },
  currentPlayer: {
    position: "relative",
    top: -30,
    fontSize: 40
  },
  score: {
    fontSize: 20
  }
});
