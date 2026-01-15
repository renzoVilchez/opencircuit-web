import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createProject,
    openProject
} from '../features/projects/projectsSlice';
import { setProject } from '../features/circuit/circuitSlice';

export default function ProjectsPage() {
    const projects = useSelector(state => state.projects.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const handleCreate = () => {
        if (!name.trim()) return;

        dispatch(createProject(name));
        setName('');
        setOpen(false);
        navigate('/editor');
    };

    const handleOpen = (project) => {
        dispatch(openProject(project.id));
        dispatch(setProject(project.circuit));
        navigate('/editor');
    };

    return (
        <div style={{ padding: 24 }}>
            <h2>Proyectos</h2>

            <button onClick={() => setOpen(true)}>
                Nuevo proyecto
            </button>

            <ul>
                {projects.map(p => (
                    <li key={p.id}>
                        <strong>{p.name}</strong>
                        {' - '}
                        <small>
                            {new Date(p.updatedAt).toLocaleDateString()}
                        </small>
                        {' '}
                        <button onClick={() => handleOpen(p)}>
                            Abrir
                        </button>
                    </li>
                ))}
            </ul>

            {open && (
                <div style={{ marginTop: 16 }}>
                    <input
                        placeholder="Nombre del proyecto"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button onClick={handleCreate}>
                        Crear
                    </button>
                    <button onClick={() => setOpen(false)}>
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}