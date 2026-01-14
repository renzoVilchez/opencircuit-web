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
        },
        updateComponentProps: (state, action) => {
            const { id, props } = action.payload;
            const comp = state.components.find(c => c.id === id);
            if (comp) {
                comp.props = { ...comp.props, ...props };
            }
        },
        updateComponentRotation: (state, action) => {
            const comp = state.components.find(
                c => c.id === action.payload.id
            );
            if (comp) {
                comp.rotation = action.payload.rotation;
            }
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
    removeWire,
    updateComponentProps,
    updateComponentRotation
} = circuitSlice.actions;

export default circuitSlice.reducer;