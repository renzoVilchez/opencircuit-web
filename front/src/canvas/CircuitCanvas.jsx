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
} from '../features/circuit/circuitSlice';


const GRID_SIZE = 40;

export default function CircuitCanvas() {
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
            onClick={handleStageClick}
        >
            <Layer>
                {lines}
                {components.map((c) => {
                    if (c.type === 'resistor') {
                        return (
                            <Resistor
                                key={c.id}
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
                            />
                        );
                    }
                    return null;
                })}
            </Layer>
        </Stage>
    );
}