import { Group, Line, Rect, Circle, Text } from 'react-konva';

export default function Resistor({
    id,
    x,
    y,
    rotation = 0,
    onDragEnd,
    onSelect,
    isSelected,
    tool,
    onPinClick,
    props,
    label
}) {
    const pins = [
        { id: 'pin-1', x: -30, y: 0 },
        { id: 'pin-2', x: 30, y: 0 }
    ];

    const PIN_RADIUS = 4;

    return (
        <Group
            x={x}
            y={y}
            rotation={rotation}
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

            {/* Pines */}
            {pins.map(pin => (
                <Circle
                    key={pin.id}
                    x={pin.x}
                    y={pin.y}
                    radius={PIN_RADIUS}
                    fill="red"
                    onClick={(e) => {
                        e.cancelBubble = true;
                        if (onPinClick) {
                            onPinClick({
                                componentId: id,
                                pinId: pin.id,
                                x: x + pin.x,
                                y: y + pin.y
                            });
                        }
                    }}
                />
            ))}

            <Text
                text={label}
                fontSize={12}
                y={-25}
                x={-15}
            />

            <Text
                text={`${props.ohms}Ω`}
                fontSize={12}
                y={15}
                x={-20}
            />

        </Group>
    );
}