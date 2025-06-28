import type { User } from "../../utils/types";

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
}

export default function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Email</th>
          <th scope="col">Rol</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={user.id}>
            <th scope="row">{idx + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit?.(user)}>
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 