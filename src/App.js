import "./App.css";
import SimplexNoise from "simplex-noise";

function ContinuousLine({ grid, spacing }) {
  let startXIndex = Math.floor(Math.random() * 250);
  let startYIndex = Math.floor(Math.random() * 150);
  let colours = ["rgba(207, 225, 185,0.05)", "rgba(233, 245, 219, 0.05)", "rgba(91, 192, 235,0.05)"];

  let colour = colours[0];
  if (
    (startXIndex > 75 + (Math.random() * 50 - 25) &&
      startXIndex < 175 + (Math.random() * 50 - 25)) ||
    (startYIndex > 50 + (Math.random() * 50 - 25) &&
      startYIndex < 100 + (Math.random() * 50 - 25))
  ) {
    colour = colours[1];
  }
  if (
    startXIndex > 175 + (Math.random() * 50 - 25) ||
    startYIndex > 100 + (Math.random() * 50 - 25)
  ) {
    colour = colours[2];
  }

  let startXPos = startXIndex * spacing;
  let startYPos = startYIndex * spacing;
  let steps = 50;
  let points = `${startXPos},${startYPos} `;
  for (let i = 0; i < steps; i++) {
    if (!grid[startYIndex] || !grid[startYIndex][startXIndex]) break;
    let endpointX =
      startXPos + spacing * Math.cos(grid[startYIndex][startXIndex]);
    let endpointY =
      startYPos + spacing * Math.sin(grid[startYIndex][startXIndex]);
    points += `${endpointX},${endpointY} `;
    startXIndex += 1;
    startYIndex += 1;
    startXPos = endpointX;
    startYPos = endpointY;
  }
  return (
    <polyline
      points={points}
      fill="none"
      stroke={`${colour}`}
      strokeWidth={Math.random() * 1.5}
    />
  );
}

function Line({ x, y, angle, stroke, width }) {
  let length = 5 + Math.random();
  let endpointX = x + length * Math.cos(angle);
  let endpointY = y + length * Math.sin(angle);
  let random = Math.random() * 5;
  return (
    <g>
      <line
        x1={x}
        x2={endpointX}
        y1={y}
        y2={endpointY}
        stroke={stroke}
        strokeWidth={random * width}
      />
    </g>
  );
}

function App() {
  const Simplex = new SimplexNoise(Math.random);

  let width = 250;
  let height = 150;
  let spacing = 5;
  let resolution = 1;

  let numberOfRows = height / resolution;
  let numberOfColumns = width / resolution;

  let grid = new Array(numberOfRows);

  for (let i = 0; i < numberOfRows; i++) {
    grid[i] = new Array(numberOfColumns);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = Simplex.noise2D(i / 50, j / 50) * Math.PI / 2;
    }
  }

  return (
    <svg style={{ height: "100vh", width: "100vw", background: "#242038" }}>
      {grid.map((r, i) => {
        return r.map((c, j) => {
          return (
            <Line
              x={j * spacing}
              y={i * spacing}
              angle={grid[i][j]}
              stroke="#6C757D "
              width={1}
            />
          );
        });
      })}
      {[...Array(50000)].map((x,i) => (
        <ContinuousLine key={i} grid={grid} spacing={spacing} />
      ))}
    </svg>
  );
}

export default App;
