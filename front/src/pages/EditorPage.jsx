import CircuitCanvas from '../canvas/CircuitCanvas';
import Toolbar from '../components/Toolbar';
import Inspector from '../components/Inspector';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCircuit } from '../features/circuit/circuitSlice';
import { updateProject } from '../features/projects/projectsSlice';

export default function EditorPage() {
    const dispatch = useDispatch();

    const { list, currentProjectId } = useSelector(
        state => state.projects
    );

    const circuit = useSelector(state => state.circuit);

    const project = list.find(p => p.id === currentProjectId);

    useEffect(() => {
        if (!currentProjectId || !project) return;
        dispatch(loadCircuit(project.circuit));
    }, [currentProjectId]);

    useEffect(() => {
        if (!currentProjectId) return;

        const timeout = setTimeout(() => {
            dispatch(updateProject({
                components: circuit.components,
                wires: circuit.wires
            }));
        }, 800);

        return () => clearTimeout(timeout);
    }, [circuit, currentProjectId, dispatch]);

    return (
        <>
            <Toolbar />
            <CircuitCanvas />
            <Inspector />
        </>
    );
}