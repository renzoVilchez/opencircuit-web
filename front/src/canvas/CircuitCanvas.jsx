import { Stage, Layer, Line } from 'react-konva';

const GRID_SIZE = 40;

export default function CircuitCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const lines = [];

  // Líneas verticales
  for (let i = 0; i < width / GRID_SIZE; i++) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i * GRID_SIZE, 0, i * GRID_SIZE, height]}
        stroke="#e0e0e0"
        strokeWidth={1}
      />
    );
  }

  // Líneas horizontales
  for (let j = 0; j < height / GRID_SIZE; j++) {
    lines.push(
      <Line
        key={`h-${j}`}
        points={[0, j * GRID_SIZE, width, j * GRID_SIZE]}
        stroke="#e0e0e0"
        strokeWidth={1}
      />
    );
  }

  return (
    <Stage width={width} height={height}>
      <Layer>{lines}</Layer>
    </Stage>
  );
}