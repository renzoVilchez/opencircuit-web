import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    components: [],
    selectedComponentId: null,
    tool: 'select',
    wires: [],
    selectedWireId: null
};

const circuitSlice = createSlice({
    name: 'circuit',
    initialState,
    reducers: {
        addComponent: (state, action) => {
            state.components.push({
                id: crypto.randomUUID(),
                ...action.payload
            });
        },
        updateComponentPosition: (state, action) => {
            const { id, x, y } = action.payload;
            const component = state.components.find((c) => c.id === id);
            if (component) {
                component.x = x;
                component.y = y;
            }
        },
        selectComponent: (state, action) => {
            state.selectedComponentId = action.payload;
        },
        clearSelection: (state) => {
            state.selectedComponentId = null;
        },
        removeComponent: (state, action) => {
            state.components = state.components.filter(
                (c) => c.id !== action.payload
            );
            if (state.selectedComponentId === action.payload) {
                state.selectedComponentId = null;
            }
        },
        setTool: (state, action) => {
            state.tool = action.payload;
        },
        addWire: (state, action) => {
            state.wires.push({
                id: crypto.randomUUID(),
                ...action.payload
            });
        },
        selectWire: (state, action) => {
            state.selectedWireId = action.payload;
            state.selectedComponentId = null;
        },
        clearWireSelection: (state) => {
            state.selectedWireId = null;
        },
        removeWire: (state, action) => {
            state.wires = state.wires.filter(w => w.id !== action.payload);
        }
    }
});

export const {
    addComponent,
    updateComponentPosition,
    selectComponent,
    clearSelection,
    removeComponent,
    setTool,
    addWire,
    selectWire,
    removeWire
} = circuitSlice.actions;

export default circuitSlice.reducer;