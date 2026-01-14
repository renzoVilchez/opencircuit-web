import CircuitCanvas from '../canvas/CircuitCanvas';
import Toolbar from '../components/Toolbar';
import Inspector from '../components/Inspector';

export default function EditorPage() {
  return (
        <>
            <Toolbar />
            <CircuitCanvas />
            <Inspector/>
        </>
    );
}