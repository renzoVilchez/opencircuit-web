import { useSelector } from 'react-redux';
import ResistorInspector from './inspectors/ResistorInspector';

export default function ComponentInspector() {
    const component = useSelector(state =>
        state.circuit.project.components.find(
            c => c.id === state.circuit.selectedComponentId
        )
    );

    if (!component) return null;

    switch (component.type) {
        case 'resistor':
            return <ResistorInspector component={component} />;

        // futuro
        // case 'voltage-source':
        //     return <VoltageSourceInspector component={component} />;

        default:
            return null;
    }
}