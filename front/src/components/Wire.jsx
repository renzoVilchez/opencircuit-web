import { Line } from 'react-konva';

export default function Wire({
    wire,
    components,
    getPinPosition,
    isSelected,
    onSelect
}) {
    const fromComponent = components.find(
        c => c.id === wire.from.componentId
    );
    const toComponent = components.find(
        c => c.id === wire.to.componentId
    );

    if (!fromComponent || !toComponent) return null;

    const fromPos = getPinPosition(fromComponent, wire.from.pinId);
    const toPos = getPinPosition(toComponent, wire.to.pinId);

    return (
        <Line
            points={[
                fromPos.x,
                fromPos.y,
                toPos.x,
                toPos.y
            ]}
            stroke={isSelected ? '#1976d2' : 'black'}
            strokeWidth={isSelected ? 4 : 3}
            onClick={(e) => {
                e.cancelBubble = true;
                onSelect();
            }}
        />
    );
}