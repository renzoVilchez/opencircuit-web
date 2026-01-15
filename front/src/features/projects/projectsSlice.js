import { createSlice, nanoid } from '@reduxjs/toolkit';

const STORAGE_KEY = 'open-circuit-projects';

const initialState = {
    list: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    currentProjectId: null
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        createProject: {
            reducer(state, action) {
                state.list.push(action.payload);
                state.currentProjectId = action.payload.id;

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(state.list)
                );
            },
            prepare(name) {
                const now = Date.now();
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        createdAt: now,
                        updatedAt: now,
                        circuit: {
                            components: [],
                            wires: []
                        }
                    }
                };
            }
        },

        openProject(state, action) {
            state.currentProjectId = action.payload;
        },

        deleteProject(state, action) {
            const id = action.payload;

            state.list = state.list.filter(p => p.id !== id);

            if (state.currentProjectId === id) {
                state.currentProjectId = null;
            }

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state.list)
            );
        },

        updateProject(state, action) {
            const index = state.list.findIndex(
                p => p.id === state.currentProjectId
            );
            if (index === -1) return;

            state.list[index] = {
                ...state.list[index],
                circuit: action.payload,
                updatedAt: Date.now()
            };

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state.list)
            );
        }
    }
});

export const {
    createProject,
    openProject,
    deleteProject,
    updateProject
} = projectsSlice.actions;

export default projectsSlice.reducer;