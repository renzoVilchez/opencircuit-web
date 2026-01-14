import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ComponentInspector from '../components/ComponentInspector';
import WireInspector from '../components/WireInspector';

const styles = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: 300,
    height: '100vh',
    borderLeft: '1px solid #ddd',
    padding: 2,
    boxSizing: 'border-box',
    color: 'black',
    backgroundColor: '#fff',
    zIndex: 10
};

export default function Inspector() {
    const selectedComponentId = useSelector(
        state => state.circuit.selectedComponentId
    );
    const selectedWireId = useSelector(
        state => state.circuit.selectedWireId
    );

    return (
        <Box sx={styles}>
            {!selectedComponentId && !selectedWireId && (
                <>
                    <Typography variant="h6">Inspector</Typography>
                    <Typography variant="body2">
                        Selecciona un componente o cable
                    </Typography>
                </>
            )}

            {selectedComponentId && <ComponentInspector />}
            {selectedWireId && <WireInspector />}
        </Box>
    );
}