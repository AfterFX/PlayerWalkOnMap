import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  PanResponderInstance,
} from 'react-native';

const TILE_SIZE = 50;
const NUM_TILE_TYPES = 4;
const TILE_COLORS = ['#0000DD', '#00CC00', '#AAAAAA', '#773300'];
const WORLD_SIZE = 10000;
const TILES_IN_A_LINE = Math.floor(WORLD_SIZE / TILE_SIZE);
const VIEW_WIDTH = 480;
const VIEW_HEIGHT = 480;
const VIEW_TILE_WIDTH = Math.floor(VIEW_WIDTH / TILE_SIZE);
const VIEW_TILE_HEIGHT = Math.floor(VIEW_HEIGHT / TILE_SIZE);

interface GameState {
  playerX: number;
  playerY: number;
  leftTile: number;
  topTile: number;
  tileOffsetX: number;
  tileOffsetY: number;
  tileGrid: object;
}

class Game extends React.Component<any, GameState> {
  private panResponder: PanResponderInstance;
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      playerX: WORLD_SIZE / 2,
      playerY: WORLD_SIZE / 2,
      leftTile: 0,
      topTile: 0,
      tileOffsetX: 0,
      tileOffsetY: 0,
      tileGrid: this.generateTileGrid(),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
    });
  }

  handlePanResponderMove = (event: any, gestureState: {dx: any; dy: any}) => {
    const {dx, dy} = gestureState;
    this.setState(prevState => ({
      playerX: prevState.playerX + dx,
      playerY: prevState.playerY + dy,
    }));
    // this.onEnterFrame();
  };

  componentDidMount() {
    // this.interval = setInterval(this.onEnterFrame, 1000 / 30);
    this.onEnterFrame();
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  generateTileGrid = () => {
    const tileGrid = [];
    for (let x = 0; x < TILES_IN_A_LINE; x++) {
      const column = [];
      for (let y = 0; y < TILES_IN_A_LINE; y++) {
        column[y] = Math.floor(Math.random() * NUM_TILE_TYPES);
      }
      tileGrid[x] = column;
    }
    return tileGrid;
  };

  onEnterFrame = () => {
    const {playerX, playerY} = this.state;

    const left = playerX - VIEW_WIDTH / 2;
    const top = playerY - VIEW_HEIGHT / 2;

    this.setState({
      leftTile: Math.floor(left / TILE_SIZE),
      topTile: Math.floor(top / TILE_SIZE),
      tileOffsetX: left % TILE_SIZE,
      tileOffsetY: top % TILE_SIZE,
    });
    requestAnimationFrame(this.onEnterFrame);
  };

  render() {
    const {tileGrid, leftTile, topTile, tileOffsetX, tileOffsetY} = this.state;

    return (
      <View style={styles.container}>
        {Array.from({length: VIEW_TILE_WIDTH}, (_, x) =>
          Array.from({length: VIEW_TILE_HEIGHT}, (_, y) => (
            <View
              key={`tile-${x}-${y}`}
              style={{
                position: 'absolute',
                left: x * TILE_SIZE - tileOffsetX,
                top: y * TILE_SIZE - tileOffsetY,
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor:
                  TILE_COLORS[tileGrid[leftTile + x][topTile + y]],
              }}
            />
          )),
        )}
        <View style={styles.joystickContainer}>
          <View {...this.panResponder.panHandlers} style={styles.joystick}>
            <Text style={{color: 'white'}}>JOYSTICK</Text>
          </View>
        </View>
        <View style={styles.player} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  joystickContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  joystick: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    position: 'absolute',
    left: VIEW_WIDTH / 2 - 10,
    top: VIEW_HEIGHT / 2 - 10,
    width: 20,
    height: 20,
    backgroundColor: '#000000',
  },
});

export default Game;
