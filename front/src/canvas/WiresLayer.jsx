import { Layer } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import Wire from '../components/Wire';
import { selectWire } from '../features/circuit/circuitSlice';

export default function WiresLayer({ wires, components, getPinPosition }) {
    const dispatch = useDispatch();
    const selectedWireId = useSelector(s => s.circuit.selectedWireId);

    return (
        <Layer>
            {wires.map(w => (
                <Wire
                    key={w.id}
                    wire={w}
                    components={components}
                    getPinPosition={getPinPosition}
                    isSelected={w.id === selectedWireId}
                    onSelect={() => dispatch(selectWire(w.id))}
                />
            ))}
        </Layer>
    );
}