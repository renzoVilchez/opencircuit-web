import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    components: [],
    selectedComponentId: null
};

const circuitSlice = createSlice({
    name: 'circuit',
    initialState,
    reducers: {
        addComponent: (state, action) => {
            state.components.push(action.payload);
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
        }
    }
});

export const {
    addComponent,
    updateComponentPosition,
    selectComponent,
    clearSelection,
    removeComponent
} = circuitSlice.actions;

export default circuitSlice.reducer;