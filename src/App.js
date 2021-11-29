import "./App.css";
import SimplexNoise from "simplex-noise";

function Line({ x, y, angle, stroke, width }) {
  let length = 5 + Math.random() * 40;
  let endpointX = x + length * Math.cos(angle);
  let endpointY = y + length * Math.sin(angle);
  let random = Math.random() * 5;
  return (
    <g>
      <circle cx={x} cy={y} fill={stroke} r={Math.random() * 5 * width} />
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
  const simplex = new SimplexNoise(Math.random);
  const otherSimplex = new SimplexNoise(Math.random);
  const otherOtherSimplex = new SimplexNoise(Math.random);

  let width = 100;
  let height = 100;
  let resolution = 1;

  let numberOfRows = height / resolution;
  let numberOfColumns = width / resolution;

  let grid = new Array(numberOfRows);
  let grid2 = new Array(numberOfRows);
  let grid3 = new Array(numberOfRows);

  for (let i = 0; i < numberOfRows; i++) {
    grid[i] = new Array(numberOfColumns);
    grid2[i] = new Array(numberOfColumns);
    grid3[i] = new Array(numberOfColumns);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = simplex.noise2D(i / 50, j / 50) * Math.PI * 2;
      grid2[i][j] = otherSimplex.noise2D(i / 50, j / 50) * Math.PI * 2;
      grid3[i][j] = otherOtherSimplex.noise2D(i / 50, j / 50) * Math.PI * 2;
    }
  }

  let spacing = 30

  return (
    <svg style={{ height: "100vh", width: "100vw", background: "#081c15" }}>
      {grid.map((r, i) => {
        return r.map((c, j) => {
          return (
            <Line
              x={j * spacing}
              y={i * spacing}
              angle={grid[i][j]}
              stroke="#1b4332"
              width={1}
              />
              );
            });
          })}
      {grid2.map((r, i) => {
        return r.map((c, j) => {
          return (
            <Line
            x={j * spacing}
            y={i * spacing}
            angle={grid2[i][j]}
            stroke="#2d6a4f"
            width={1}
            />
            );
          });
        })}
      {grid3.map((r, i) => {
        return r.map((c, j) => {
          return (
            <Line
            x={j * spacing}
            y={i * spacing}
            angle={grid3[i][j]}
            stroke="#40916c"
              width={1}
            />
          );
        });
      })}
    </svg>
  );
}

export default App;
