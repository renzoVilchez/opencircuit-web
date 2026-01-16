import { Layer, Line } from 'react-konva';

export default function DynamicWire({
    wireStart,
    mousePos,
    components,
    getPinPosition
}) {
    if (!wireStart || !mousePos) return null;

    const component = components.find(c => c.id === wireStart.componentId);
    if (!component) return null;

    const start = getPinPosition(component, wireStart.pinId);

    return (
        <Layer>
            <Line
                points={[start.x, start.y, mousePos.x, mousePos.y]}
                stroke="gray"
                dash={[4, 4]}
                strokeWidth={2}
            />
        </Layer>
    );
}