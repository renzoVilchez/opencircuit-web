import CircuitCanvas from '../canvas/CircuitCanvas';
import Toolbar from '../components/Toolbar';
import Inspector from '../components/Inspector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProject } from '../features/circuit/circuitSlice';

export default function EditorPage() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadProject());
    }, []);

    return (
        <>
            <Toolbar />
            <CircuitCanvas />
            <Inspector />
        </>
    );
}