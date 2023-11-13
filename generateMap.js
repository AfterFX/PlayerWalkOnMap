const mapSize = 1000;
const tileSize = 10;
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

function generateMap() {
  const mapData = {
    tiles: [],
  };

  for (let x = 0; x < mapSize; x++) {
    for (let y = 0; y < mapSize; y++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      mapData.tiles.push({x, y, color: randomColor});
    }
  }

  return mapData;
}

const generatedMapData = generateMap();
const jsonMapData = JSON.stringify(generatedMapData, null, 2);

console.log(jsonMapData);
