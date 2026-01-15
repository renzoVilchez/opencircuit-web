import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    components: [],
    wires: [],
    selectedComponentId: null,
    selectedWireId: null,
    tool: 'select'
};

const circuitSlice = createSlice({
    name: 'circuit',
    initialState,
    reducers: {
        loadCircuit(state, action) {
            state.components = action.payload.components || [];
            state.wires = action.payload.wires || [];
        },

        addComponent(state, action) {
            const type = action.payload.type;

            const count = state.components.filter(
                c => c.type === type
            ).length + 1;

            state.components.push({
                id: crypto.randomUUID(),
                rotation: 0,
                label: type === 'resistor' ? `R${count}` : '',
                props: { ohms: 220 },
                ...action.payload
            });
        },

        updateComponentPosition(state, action) {
            const { id, x, y } = action.payload;
            const comp = state.components.find(c => c.id === id);
            if (comp) {
                comp.x = x;
                comp.y = y;
            }
        },

        updateComponentProps(state, action) {
            const comp = state.components.find(c => c.id === action.payload.id);
            if (comp) {
                comp.props = { ...comp.props, ...action.payload.props };
            }
        },

        updateComponentRotation(state, action) {
            const comp = state.components.find(c => c.id === action.payload.id);
            if (comp) {
                comp.rotation = action.payload.rotation;
            }
        },

        updateComponentLabel(state, action) {
            const comp = state.components.find(c => c.id === action.payload.id);
            if (comp) {
                comp.label = action.payload.label;
            }
        },

        removeComponent(state, action) {
            state.components = state.components.filter(
                c => c.id !== action.payload
            );
            if (state.selectedComponentId === action.payload) {
                state.selectedComponentId = null;
            }
        },

        addWire(state, action) {
            state.wires.push({
                id: crypto.randomUUID(),
                ...action.payload
            });
        },

        removeWire(state, action) {
            state.wires = state.wires.filter(
                w => w.id !== action.payload
            );
        },

        selectComponent(state, action) {
            state.selectedComponentId = action.payload;
            state.selectedWireId = null;
        },

        selectWire(state, action) {
            state.selectedWireId = action.payload;
            state.selectedComponentId = null;
        },

        clearSelection(state) {
            state.selectedComponentId = null;
            state.selectedWireId = null;
        },

        clearAllSelection: (state) => {
            state.selectedComponentId = null;
            state.selectedWireId = null;
        },

        setTool(state, action) {
            state.tool = action.payload;
        }
    }
});

export const {
    loadCircuit,
    addComponent,
    updateComponentPosition,
    updateComponentProps,
    updateComponentRotation,
    updateComponentLabel,
    removeComponent,
    addWire,
    removeWire,
    selectComponent,
    selectWire,
    clearSelection,
    clearAllSelection,
    setTool
} = circuitSlice.actions;

export default circuitSlice.reducer;