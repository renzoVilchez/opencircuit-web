import { Group, Line, Rect } from 'react-konva';

export default function Resistor({
    x,
    y,
    onDragEnd,
    onSelect,
    isSelected,
    tool
}) {
    return (
        <Group
            x={x}
            y={y}
            draggable={tool === 'select'}
            onClick={(e) => {
                e.cancelBubble = true;
                onSelect();
            }}
            onTap={(e) => {
                e.cancelBubble = true;
                onSelect();
            }}
            onDragStart={(e) => {
                e.cancelBubble = true;
            }}
            onDragEnd={(e) => {
                e.cancelBubble = true;
                const node = e.target;
                onDragEnd({
                    x: node.x(),
                    y: node.y()
                });
            }}
        >
            {/* Línea izquierda */}
            <Line points={[-30, 0, -10, 0]} stroke="black" strokeWidth={2} />

            {/* Cuerpo */}
            <Rect
                x={-10}
                y={-8}
                width={20}
                height={16}
                stroke={isSelected ? '#1976d2' : 'black'}
                strokeWidth={isSelected ? 3 : 2}
                fill="white"
            />

            {/* Línea derecha */}
            <Line points={[10, 0, 30, 0]} stroke="black" strokeWidth={2} />
        </Group>
    );
}