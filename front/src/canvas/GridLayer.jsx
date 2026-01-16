import { Layer, Line } from 'react-konva';

const GRID_SIZE = 40;

export default function GridLayer({ width, height }) {
    const lines = [];

    for (let i = 0; i < width / GRID_SIZE; i++) {
        lines.push(
            <Line key={`v-${i}`} points={[i * GRID_SIZE, 0, i * GRID_SIZE, height]} stroke="#e0e0e0" />
        );
    }

    for (let j = 0; j < height / GRID_SIZE; j++) {
        lines.push(
            <Line key={`h-${j}`} points={[0, j * GRID_SIZE, width, j * GRID_SIZE]} stroke="#e0e0e0" />
        );
    }

    return <Layer>{lines}</Layer>;
}