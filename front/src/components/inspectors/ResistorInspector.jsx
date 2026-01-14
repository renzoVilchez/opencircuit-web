import { TextField, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateComponentProps, updateComponentRotation } from '../../features/circuit/circuitSlice';

export default function ResistorInspector({ component }) {
    const dispatch = useDispatch();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Nombre"
                value={component.label || ''}
                onChange={(e) =>
                    dispatch(updateComponentProps({
                        id: component.id,
                        props: { label: e.target.value }
                    }))
                }
                fullWidth
            />

            <TextField
                label="Resistencia (Ω)"
                type="number"
                value={component.props?.ohms ?? 0}
                onChange={(e) =>
                    dispatch(updateComponentProps({
                        id: component.id,
                        props: { ohms: Number(e.target.value) }
                    }))
                }
                fullWidth
            />

            <Button
                variant="outlined"
                onClick={() =>
                    dispatch(updateComponentRotation({
                        id: component.id,
                        rotation: (component.rotation + 90) % 360
                    }))
                }
            >
                Rotar 90°
            </Button>
        </Box>
    );
}