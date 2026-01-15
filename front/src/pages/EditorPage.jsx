import CircuitCanvas from '../canvas/CircuitCanvas';
import Toolbar from '../components/Toolbar';
import Inspector from '../components/Inspector';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../features/projects/projectsSlice';


export default function EditorPage() {
    const dispatch = useDispatch();

    const circuit = useSelector(state => state.circuit.project);
    const currentProjectId = useSelector(
        state => state.projects.currentProjectId
    );

    useEffect(() => {
        if (!currentProjectId) return;

        const timeout = setTimeout(() => {
            dispatch(updateProject(circuit));
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