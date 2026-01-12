import { configureStore } from '@reduxjs/toolkit';
import circuitReducer from '../features/circuit/circuitSlice';

export const store = configureStore({
  reducer: {
    circuit: circuitReducer
  }
});