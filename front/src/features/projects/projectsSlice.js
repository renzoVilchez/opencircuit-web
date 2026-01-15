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
            prepare(name) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        createdAt: Date.now(),
                        updatedAt: Date.now(),
                        circuit: {
                            components: [],
                            wires: []
                        }
                    }
                };
            },
            reducer(state, action) {
                state.list.push(action.payload);
                state.currentProjectId = action.payload.id;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
            }
        },

        openProject(state, action) {
            state.currentProjectId = action.payload;
        },

        updateProject(state, action) {
            const project = state.list.find(
                p => p.id === state.currentProjectId
            );
            if (!project) return;

            project.circuit = action.payload;
            project.updatedAt = Date.now();

            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
        },

        deleteProject(state, action) {
            state.list = state.list.filter(p => p.id !== action.payload);
            if (state.currentProjectId === action.payload) {
                state.currentProjectId = null;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
        },

        saveCurrentProject(state, action) {
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
    updateProject,
    deleteProject,
    saveCurrentProject
} = projectsSlice.actions;

export default projectsSlice.reducer;