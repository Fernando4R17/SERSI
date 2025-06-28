import { useState } from "react";
import type { User } from "../../utils/types";

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (values: Partial<User>) => void;
  onClose: () => void;
  onDelete?: () => void;
  currentUser?: User | null;
}

export default function UserForm({ initialValues = {}, onSubmit, onClose, onDelete, currentUser }: UserFormProps) {
  const [form, setForm] = useState<Partial<User>>({
    name: initialValues.name || "",
    email: initialValues.email || "",
    password: "",
    role: initialValues.role || "user",
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setForm(f => ({
      ...f,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setShowConfirm(false);
    onDelete?.();
  };

  const isEditing = !!initialValues.id;
  const isEditingSelf = isEditing && currentUser && initialValues.id === currentUser.id;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={isEditing ? "(Dejar en blanco para no cambiar)" : ""}
          required={!isEditing}
          minLength={6}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select
          className="form-select"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          disabled={!!isEditingSelf}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div className="d-flex justify-content-between align-items-end mt-4">
        {onDelete && !isEditingSelf && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Eliminar
          </button>
        )}
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </div>
      {showConfirm && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Estás seguro?</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Seguro que deseas eliminar este usuario?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
} 