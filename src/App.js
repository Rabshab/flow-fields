import "./App.css";
import SimplexNoise from "simplex-noise";

function Dots({ grid, spacing }) {
  let startXIndex = Math.floor(Math.random() * 250);
  let startYIndex = Math.floor(Math.random() * 150);
  let colours = [
    "rgba(207, 225, 185,0.1)",
    "rgba(233, 245, 219, 0.2)",
    "rgba(91, 192, 235,0.3)",
  ];

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
  let steps = 10;
  let points = [[startXPos, startYPos]];
  for (let i = 0; i < steps; i++) {
    if (!grid[startYIndex] || !grid[startYIndex][startXIndex]) break;
    let endpointX =
      startXPos + spacing * Math.cos(grid[startYIndex][startXIndex]);
    let endpointY =
      startYPos + spacing * Math.sin(grid[startYIndex][startXIndex]);
    points.push([endpointX, endpointY]);
    startXIndex += 1;
    startYIndex += 1;
    startXPos = endpointX;
    startYPos = endpointY;
  }

  function getSize() {
    let seed = Math.random();
    if (seed > 0.99) {
      return seed * 10;
    }
    if (seed > 0.93 && seed < 0.99) {
      return seed * 5;
    }
    return seed * 2;
  }
  
  return (
    <g>
      {points.map((p) => {
        let size = getSize();
        let filter = "none";
        if (size > 9) filter = `url(#f1)`;
        if (size > 4 && size < 6) filter = `url(#f2)`;
        return (
          <circle
            cx={p[0]}
            cy={p[1]}
            r={size}
            fill={`${colour}`}
            filter={filter}
          />
        );
      })}
    </g>
  );
}

function ContinuousLine({ grid, spacing }) {
  let startXIndex = Math.floor(Math.random() * 250);
  let startYIndex = Math.floor(Math.random() * 150);
  let colours = [
    "rgba(207, 225, 185,0.05)",
    "rgba(233, 245, 219, 0.05)",
    "rgba(91, 192, 235,0.05)",
  ];

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
  let length = 15 + Math.random();
  let endpointX = x + length * Math.cos(angle);
  let endpointY = y + length * Math.sin(angle);
  return (
    <g>
      <line
        x1={x}
        x2={endpointX}
        y1={y}
        y2={endpointY}
        stroke={stroke}
        strokeWidth={width}
      />
    </g>
  );
}

function Truchet({ x, y, width, angle, spacing, stroke }) {
  let startX1 = x;
  let startY1 = y + spacing / 2;
  let endX1 = x + spacing / 2;
  let endY1 = y;

  let startX2 = x + spacing / 2;
  let startY2 = y + spacing;
  let endX2 = x + spacing;
  let endY2 = y + spacing / 2;

  if (
    (Math.cos(angle) > 0 && Math.sin(angle) < 0) ||
    (Math.cos(angle) < 0 && Math.sin(angle) > 0)
  ) {
    startX1 = x;
    startY1 = y + spacing / 2;
    endX1 = x + spacing / 2;
    endY1 = y + spacing;

    startX2 = x + spacing / 2;
    startY2 = y;
    endX2 = x + spacing;
    endY2 = y + spacing / 2;
  }

  return (
    <g>
      <path
        d={`M ${startX1} ${startY1} C ${x + spacing / 2} ${y + spacing / 2}, ${
          x + spacing / 2
        } ${y + spacing / 2}, ${endX1} ${endY1} `}
        stroke={stroke}
        fill="none"
        strokeWidth={width}
      />
      <path
        d={`M ${startX2} ${startY2} C ${x + spacing / 2} ${y + spacing / 2}, ${
          x + spacing / 2
        } ${y + spacing / 2}, ${endX2} ${endY2} `}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
      />
      <rect
        x={x}
        y={y}
        width={spacing + (10 * Math.random() - 5)}
        height={spacing + (10 * Math.random() - 5)}
        stroke="#2A9D8F"
        fill="none"
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
      grid[i][j] = (Simplex.noise2D(i / 50, j / 50) * Math.PI) / 2;
    }
  }

  return (
    <svg style={{ height: "100vh", width: "100vw", background: "#264653" }}>
      <filter id="f1">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
      </filter>
      <filter id="f2">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>
      {/* {grid.map((r, i) => {
        return r.map((c, j) => {
          return (
            <g>
              <Line
                x={j * spacing}
                y={i * spacing}
                angle={grid[i][j]}
                stroke="#E76F51"
                width={2}
              />
              <Truchet
                x={j * spacing}
                y={i * spacing}
                angle={grid[i][j]}
                stroke="#F4A261"
                width={5 + (3 * Math.random() - 1.5)}
                spacing={spacing}
              />
            </g>
          );
        });
      })} */}
      {/* {[...Array(5000)].map((x, i) => (
        <ContinuousLine key={i} grid={grid} spacing={spacing} />
      ))} */}
      {[...Array(1500)].map((x, i) => (
        <Dots key={i} grid={grid} spacing={spacing} />
      ))}
    </svg>
  );
}

export default App;
