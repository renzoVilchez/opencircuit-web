import { Stage } from 'react-konva';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridLayer from './GridLayer';
import ComponentsLayer from './ComponentsLayer';
import WiresLayer from './WiresLayer';
import DynamicWire from './DynamicWire';

import {
    addComponent,
    clearAllSelection,
    removeComponent,
    removeWire
} from '../features/circuit/circuitSlice';

const GRID_SIZE = 40;

export default function CircuitCanvas() {
    const stageRef = useRef(null);
    const dispatch = useDispatch();

    const components = useSelector(s => s.circuit.components);
    const wires = useSelector(s => s.circuit.wires);
    const tool = useSelector(s => s.circuit.tool);
    const selectedComponentId = useSelector(s => s.circuit.selectedComponentId);
    const selectedWireId = useSelector(s => s.circuit.selectedWireId);

    const [wireStart, setWireStart] = useState(null);
    const [mousePos, setMousePos] = useState(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const snapToGrid = v => Math.round(v / GRID_SIZE) * GRID_SIZE;

    const getCanvasPointerPosition = () => {
        const pointer = stageRef.current.getPointerPosition();
        return {
            x: (pointer.x - position.x) / scale,
            y: (pointer.y - position.y) / scale
        };
    };

    const getPinPosition = (component, pinId) => {
        const pin = pinId === 'pin-1'
            ? { x: -30, y: 0 }
            : { x: 30, y: 0 };

        const angle = (component.rotation ?? 0) * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            x: component.x + pin.x * cos - pin.y * sin,
            y: component.y + pin.x * sin + pin.y * cos
        };
    };

    const handleStageClick = e => {
        const stage = e.target.getStage();
        if (e.target !== stage) return;

        const pos = getCanvasPointerPosition();
        const snapped = {
            x: snapToGrid(pos.x),
            y: snapToGrid(pos.y)
        };

        if (tool === 'select') dispatch(clearAllSelection());

        if (tool === 'add-resistor') {
            dispatch(addComponent({ type: 'resistor', ...snapped }));
        }
    };

    const handleMouseMove = () => {
        if (!wireStart) return;
        const pos = getCanvasPointerPosition();
        setMousePos(pos);
    };

    const handleWheel = e => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const oldScale = scale;
        const pointer = stageRef.current.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - position.x) / oldScale,
            y: (pointer.y - position.y) / oldScale
        };

        let newScale =
            e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

        newScale = Math.max(0.5, Math.min(3, newScale));

        setScale(newScale);
        setPosition({
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        });
    };

    useEffect(() => {
        const onResize = () =>
            setSize({ width: window.innerWidth, height: window.innerHeight });

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const onKeyDown = e => {
            if (e.key !== 'Delete') return;
            if (selectedComponentId) dispatch(removeComponent(selectedComponentId));
            else if (selectedWireId) dispatch(removeWire(selectedWireId));
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [selectedComponentId, selectedWireId]);

    return (
        <Stage
            ref={stageRef}
            width={size.width}
            height={size.height}
            scaleX={scale}
            scaleY={scale}
            x={position.x}
            y={position.y}
            draggable={tool === 'pan'}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
            onClick={handleStageClick}
            onDragMove={e => {
                if (tool === 'pan') {
                    setPosition({ x: e.target.x(), y: e.target.y() });
                }
            }}
        >
            <GridLayer width={size.width} height={size.height} />
            <ComponentsLayer
                components={components}
                tool={tool}
                snapToGrid={snapToGrid}
                setWireStart={setWireStart}
            />
            <WiresLayer
                wires={wires}
                components={components}
                getPinPosition={getPinPosition}
            />
            <DynamicWire
                wireStart={wireStart}
                mousePos={mousePos}
                components={components}
                getPinPosition={getPinPosition}
            />
        </Stage>
    );
}