
# Player walk on tiled map

>**node**: 18.17.0,
>   **react**: 18.2.0,
**react-native**: 0.72.6



First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```


# About Map

**Customizable Joystick**: A simple, intuitive joystick control is provided for player navigation.

**Player-Centered View**: The game maintains the player at the center of the view, ensuring they are always the focus of action.

**Dynamic Movement**: Utilizes React Native's PanResponder for smooth and interactive player movement.

**Tile Variety**: Four distinct tile types, each with its own color.

**Infinite World**: A vast world of 10,000x10,000 units, divided into tiles, offers an extensive area for exploration.

**Efficient Tile Loading**: As the player moves, the game dynamically loads new tiles into view. This on-demand loading ensures that the world continues to expand infinitely without overwhelming the device's memory.

![](video.gif)
