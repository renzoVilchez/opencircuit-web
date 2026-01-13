import { Group, Line, Rect } from 'react-konva';

export default function Resistor({
    x,
    y,
    onDragEnd,
    onSelect,
    isSelected
}) {
    return (
        <Group
            x={x}
            y={y}
            draggable
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
                stroke="black"
                strokeWidth={2}
                fill="white"
            />

            {/* Línea derecha */}
            <Line points={[10, 0, 30, 0]} stroke="black" strokeWidth={2} />
        </Group>
    );
}