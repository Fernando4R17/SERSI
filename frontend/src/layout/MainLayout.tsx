import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
