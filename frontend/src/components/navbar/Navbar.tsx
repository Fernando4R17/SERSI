import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services';
import { authApi } from '../../services';

export default function Navbar(){
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await authApi.logout();
            logout();
            setTimeout(() => {
                navigate('/');
            }, 100);
        } catch (error) {
            console.error('Logout failed:', error);
            logout();
            setTimeout(() => {
                navigate('/');
            }, 100);
        } finally {
            setLoading(false);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/equipos">Sersi</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/equipos">Equipos</Link>
                    </li>
                    {user?.role === 'admin' && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/usuarios">Usuarios</Link>
                        </li>
                    )}
                </ul>
                
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <button 
                            className="btn btn-outline-danger" 
                            onClick={handleLogout}
                            disabled={loading}
                        >
                            {loading ? 'Cerrando...' : 'Cerrar sesión'}
                        </button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}