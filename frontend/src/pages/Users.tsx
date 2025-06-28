import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi, useAuth } from '../services';
import type { User } from '../utils/types';
import UserTable from '../components/users/UserTable';
import UserForm from '../components/users/UserForm';
import { toastManager } from '../utils/toast';

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll
  });

  const users = (userData?.payload || []).filter((u: User) => u.active);

  const createUserMutation = useMutation({
    mutationFn: (userData: Partial<User>) => userApi.create(userData as Omit<User, 'id' | 'created_at' | 'updated_at' | 'email_verified_at' | 'remember_token'>),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowModal(false);
      setEditingUser(null);
      toastManager.success(response.message, 'Usuario creado exitosamente');
    },
    onError: (error: Error) => {
      toastManager.error(error.message, 'Error al crear usuario');
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, ...userData }: User) => userApi.update(id, userData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowModal(false);
      setEditingUser(null);
      toastManager.success(response.message, 'Usuario actualizado exitosamente');
    },
    onError: (error: Error) => {
      toastManager.error(error.message, 'Error al actualizar usuario');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setShowModal(false);
      setEditingUser(null);
      toastManager.success(response.message, 'Usuario eliminado exitosamente');
    },
    onError: (error: Error) => {
      toastManager.error(error.message, 'Error al eliminar usuario');
    }
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSubmit = (userData: Partial<User>) => {
    if (editingUser) {
      updateUserMutation.mutate({ ...userData, id: editingUser.id } as User);
    } else {
      createUserMutation.mutate(userData);
    }
  };

  const handleDelete = () => {
    if (editingUser) {
      deleteUserMutation.mutate(editingUser.id);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                <div className="text-center flex-grow-1 justify-content-start">
                  <h2 className="mb-0">Usuarios</h2>
                  <small className="text-white-50">Lista de Usuarios</small>
                </div>
                <div className="d-flex flex-grow-1 justify-content-end">
                  <button 
                    className="btn btn-light btn-sm" 
                    onClick={() => {
                      setEditingUser(null);
                      setShowModal(true);
                    }}
                  >
                    Agregar Usuario
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body bg-light">
              <div className="table-responsive">
                <UserTable 
                  users={users} 
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar usuario */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <UserForm 
                  initialValues={editingUser || {}}
                  onSubmit={handleSubmit}
                  onClose={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  onDelete={editingUser ? handleDelete : undefined}
                  currentUser={currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 