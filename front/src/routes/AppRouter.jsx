import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from '../pages/EditorPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}