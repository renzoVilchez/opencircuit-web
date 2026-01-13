import { Box, IconButton, Tooltip } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import TimelineIcon from '@mui/icons-material/Timeline';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PanToolIcon from '@mui/icons-material/PanTool';

import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../features/circuit/circuitSlice';

export default function Toolbar() {
    const dispatch = useDispatch();
    const tool = useSelector(state => state.circuit.tool);

    const tools = [
        { id: 'select', icon: <MouseIcon />, label: 'Seleccionar' },
        { id: 'add-resistor', icon: <HorizontalRuleIcon />, label: 'Resistor' },
        { id: 'wire', icon: <TimelineIcon />, label: 'Cable' },
        { id: 'pan', icon: <PanToolIcon />, label: 'Mover' }
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 80,
                left: 16,
                zIndex: 1300,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            {tools.map(t => (
                <Tooltip title={t.label} key={t.id}>
                    <IconButton
                        color={tool === t.id ? 'primary' : 'default'}
                        onClick={() => dispatch(setTool(t.id))}
                    >
                        {t.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
}