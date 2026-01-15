import { configureStore } from '@reduxjs/toolkit';
import circuitReducer from '../features/circuit/circuitSlice';
import projectsReducer from '../features/projects/projectsSlice';

export const store = configureStore({
  reducer: {
    circuit: circuitReducer,
    projects: projectsReducer
  }
});