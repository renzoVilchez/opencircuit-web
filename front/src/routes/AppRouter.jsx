import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectsPage from '../pages/ProjectsPage';
import EditorPage from '../pages/EditorPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  );
}