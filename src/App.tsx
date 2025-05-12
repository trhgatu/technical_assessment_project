import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserPage from '@/features/users/pages/UserPage';
import AlbumPage from '@/features/albums/pages/AlbumPage';
import AlbumDetailPage from '@/features/albums/pages/AlbumDetailPage';
import UserDetailPage from '@/features/users/pages/UserDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/albums" replace />} />
          <Route path="/albums" index element={<AlbumPage />} />
          <Route path="/albums/:id" element={<AlbumDetailPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;