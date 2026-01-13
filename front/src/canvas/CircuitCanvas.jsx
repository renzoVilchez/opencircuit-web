import { Stage, Layer, Line } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import Resistor from '../components/Resistor';
import { useDispatch, useSelector } from 'react-redux';
import {
    addComponent,
    updateComponentPosition,
    selectComponent,
    clearSelection,
    removeComponent,
    addWire
} from '../features/circuit/circuitSlice';


const GRID_SIZE = 40;

export default function CircuitCanvas() {

    const [wireStart, setWireStart] = useState(null);
    const [mousePos, setMousePos] = useState(null);

    const wires = useSelector(state => state.circuit.wires);

    const stageRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dispatch = useDispatch();
    const components = useSelector((state) => state.circuit.components);

    const tool = useSelector(state => state.circuit.tool);

    const handleStageClick = (e) => {
        const stage = e.target.getStage();

        if (e.target !== stage) return;

        const pos = getCanvasPointerPosition();
        const snapped = {
            x: snapToGrid(pos.x),
            y: snapToGrid(pos.y),
        };

        if (tool === 'select') {
            dispatch(clearSelection());
        }

        if (tool === 'add-resistor') {
            dispatch(addComponent({
                type: 'resistor',
                x: snapped.x,
                y: snapped.y
            }));
        }
    };

    const handlePinClick = (pin) => {
        if (tool !== 'wire') return;

        if (!wireStart) {
            setWireStart(pin);
            setMousePos(null);
            return;
        }

        if (
            wireStart.componentId === pin.componentId &&
            wireStart.pinId === pin.pinId
        ) {
            return;
        }

        if (wireStart.componentId === pin.componentId) {
            setWireStart(null);
            return;
        }

        dispatch(addWire({
            from: {
                componentId: wireStart.componentId,
                pinId: wireStart.pinId
            },
            to: {
                componentId: pin.componentId,
                pinId: pin.pinId
            }
        }));
        setWireStart(null);
    };

    const handleMouseMove = (e) => {
        if (!wireStart) return;

        const stage = stageRef.current;
        const pointer = stage.getPointerPosition();
        setMousePos({
            x: (pointer.x - position.x) / scale,
            y: (pointer.y - position.y) / scale
        });
    };

    const selectedComponentId = useSelector(
        (state) => state.circuit.selectedComponentId
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' && selectedComponentId) {
                dispatch(removeComponent(selectedComponentId));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedComponentId, dispatch]);

    const snapToGrid = (value) =>
        Math.round(value / GRID_SIZE) * GRID_SIZE;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const lines = [];

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

    const handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.05;
        const stage = stageRef.current;
        const oldScale = scale;

        const MIN_SCALE = 0.5;
        const MAX_SCALE = 3;

        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - position.x) / oldScale,
            y: (pointer.y - position.y) / oldScale
        };

        let newScale =
            e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

        newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

        setScale(newScale);

        setPosition({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        });
    };

    const getCanvasPointerPosition = () => {
        const stage = stageRef.current;
        const pointer = stage.getPointerPosition();

        return {
            x: (pointer.x - position.x) / scale,
            y: (pointer.y - position.y) / scale
        };
    };

    const getPinPosition = (component, pinId) => {
        const pin = pinId === 'pin-1'
            ? { x: -30, y: 0 }
            : { x: 30, y: 0 };

        return {
            x: component.x + pin.x,
            y: component.y + pin.y
        };
    };

    const startComponent = wireStart
        ? components.find(c => c.id === wireStart.componentId)
        : null;

    const startPos =
        wireStart && startComponent
            ? getPinPosition(startComponent, wireStart.pinId)
            : null;

    return (
        <Stage
            ref={stageRef}
            width={width}
            height={height}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable={tool === 'pan'}
            onWheel={handleWheel}
            onDragMove={(e) => {
                if (tool === 'pan') {
                    const stage = e.target;
                    setPosition({ x: stage.x(), y: stage.y() });
                }
            }}
            onMouseMove={handleMouseMove}
            onClick={handleStageClick}
        >
            <Layer>
                {/* Grid */}
                {lines}
                {/* Componentes */}
                {components.map((c) => {
                    if (c.type === 'resistor') {
                        return (
                            <Resistor
                                key={c.id}
                                id={c.id}
                                x={c.x}
                                y={c.y}
                                tool={tool}
                                isSelected={c.id === selectedComponentId}
                                onSelect={() => dispatch(selectComponent(c.id))}
                                onDragEnd={(pos) => {
                                    dispatch(
                                        updateComponentPosition({
                                            id: c.id,
                                            x: snapToGrid(pos.x),
                                            y: snapToGrid(pos.y)
                                        })
                                    );
                                }}
                                onPinClick={handlePinClick}
                            />
                        );
                    }
                    return null;
                })}
                {/* Wires existentes */}
                {wires.map(w => {
                    const fromComponent = components.find(c => c.id === w.from.componentId);
                    const toComponent = components.find(c => c.id === w.to.componentId);

                    if (!fromComponent || !toComponent) return null;

                    const fromPos = getPinPosition(fromComponent, w.from.pinId);
                    const toPos = getPinPosition(toComponent, w.to.pinId);



                    return (
                        <Line
                            key={`${w.id}-${fromPos.x}-${fromPos.y}-${toPos.x}-${toPos.y}`}
                            points={[fromPos.x, fromPos.y, toPos.x, toPos.y]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    );
                })}

                {/* Línea dinámica */}
                {wireStart && mousePos && startComponent && (
                    <Line
                        points={[
                            startPos.x,
                            startPos.y,
                            mousePos.x,
                            mousePos.y
                        ]}
                        stroke="gray"
                        dash={[4, 4]}
                        strokeWidth={2}
                    />
                )}
            </Layer>
        </Stage>
    );
}