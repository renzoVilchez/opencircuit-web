import { Layer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import Resistor from '../components/Resistor';
import {
    updateComponentPosition,
    selectComponent,
    addWire
} from '../features/circuit/circuitSlice';

export default function ComponentsLayer({
    components,
    tool,
    snapToGrid,
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Handles a pin click event.
 * If no wire is being created, starts a new wire at the clicked pin.
 * If a wire is being created, adds the clicked pin as the other end of the wire.
 * If the clicked pin is the same as the start of the wire, cancels the wire creation.
 * @param {Object} component - The component that was clicked.
 * @param {Object} pin - The pin that was clicked.
 */
/*******  5d7c2c30-1bef-4bf5-b8c4-3219e04a40e0  *******/  setWireStart
}) {
    const dispatch = useDispatch();
    const selectedComponentId = useSelector(s => s.circuit.selectedComponentId);

    const handlePinClick = pin => {
        setWireStart(prev => {
            if (!prev) return pin;
            if (prev.componentId === pin.componentId) return null;

            dispatch(addWire({ from: prev, to: pin }));
            return null;
        });
    };

    return (
        <Layer>
            {components.map(c =>
                c.type === 'resistor' && (
                    <Resistor
                        key={c.id}
                        {...c}
                        tool={tool}
                        isSelected={c.id === selectedComponentId}
                        onSelect={() => dispatch(selectComponent(c.id))}
                        onDragEnd={pos =>
                            dispatch(updateComponentPosition({
                                id: c.id,
                                x: snapToGrid(pos.x),
                                y: snapToGrid(pos.y)
                            }))
                        }
                        onPinClick={handlePinClick}
                    />
                )
            )}
        </Layer>
    );
}