import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  components: []
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
    }
  }
});

export const {
  addComponent,
  updateComponentPosition
} = circuitSlice.actions;

export default circuitSlice.reducer;