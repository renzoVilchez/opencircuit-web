import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    project: {
        id: null,
        name: '',
        components: [],
        wires: []
    },
    selectedComponentId: null,
    tool: 'select',
    selectedWireId: null,
};

const circuitSlice = createSlice({
    name: 'circuit',
    initialState,
    reducers: {
        setProject(state, action) {
            state.project = action.payload;
            state.selectedComponentId = null;
            state.selectedWireId = null;
        },

        setComponents(state, action) {
            state.project.components = action.payload;
        },

        setWires(state, action) {
            state.project.wires = action.payload;
        },
        addComponent: (state, action) => {
            const type = action.payload.type;

            const count = state.project.components.filter(
                c => c.type === type
            ).length + 1;

            state.project.components.push({
                id: crypto.randomUUID(),
                rotation: 0,
                label: type === 'resistor' ? `R${count}` : '',
                props: { ohms: 220 },
                ...action.payload
            });
        },
        updateComponentPosition: (state, action) => {
            const { id, x, y } = action.payload;
            const component = state.project.components.find((c) => c.id === id);
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
            state.project.components = state.project.components.filter(
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
            state.project.wires.push({
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
            state.project.wires = state.project.wires.filter(w => w.id !== action.payload);
        },
        updateComponentProps: (state, action) => {
            const { id, props } = action.payload;
            const comp = state.project.components.find(c => c.id === id);
            if (comp) {
                comp.props = { ...comp.props, ...props };
            }
        },
        updateComponentRotation: (state, action) => {
            const comp = state.project.components.find(
                c => c.id === action.payload.id
            );
            if (comp) {
                comp.rotation = action.payload.rotation;
            }
        },
        clearAllSelection: (state) => {
            state.selectedComponentId = null;
            state.selectedWireId = null;
        },
        updateComponentLabel: (state, action) => {
            const { id, label } = action.payload;
            const comp = state.project.components.find(c => c.id === id);
            if (comp) {
                comp.label = label;
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
    updateComponentRotation,
    setProject,
    setComponents,
    setWires,
    clearAllSelection,
    updateComponentLabel
} = circuitSlice.actions;

export default circuitSlice.reducer;

export const saveProject = () => (dispatch, getState) => {
    const { circuit } = getState();

    const data = {
        ...circuit.project,
        updatedAt: Date.now()
    };

    localStorage.setItem(
        'circuit-project',
        JSON.stringify(data)
    );
};

export const loadProject = () => dispatch => {
    const raw = localStorage.getItem('circuit-project');
    if (!raw) return;

    const project = JSON.parse(raw);
    dispatch(setProject(project));
};