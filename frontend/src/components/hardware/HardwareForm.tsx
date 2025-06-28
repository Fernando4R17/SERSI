import { useState } from "react";
import type { Hardware } from "../../utils/types";

interface HardwareFormProps {
  initialValues?: Partial<Hardware>;
  onSubmit: (values: Partial<Hardware>) => void;
  onClose: () => void;
  onDelete?: () => void;
}

export default function HardwareForm({ initialValues = {}, onSubmit, onClose, onDelete }: HardwareFormProps) {
  const [form, setForm] = useState<Partial<Hardware>>({
    name: initialValues.name || "",
    motortype: initialValues.motortype || "gasolina",
    fabrication_date: initialValues.fabrication_date || "",
    kW: initialValues.kW || 0,
    RPM: initialValues.RPM || 0,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;
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
        <label className="form-label">Tipo de Motor</label>
        <select
          className="form-select"
          name="motortype"
          value={form.motortype}
          onChange={handleChange}
          required
        >
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diesel</option>
          <option value="gas">Gas</option>
          <option value="eléctrico">Eléctrico</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Fabricación</label>
        <input
          type="date"
          className="form-control"
          name="fabrication_date"
          value={form.fabrication_date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Potencia(kW)</label>
        <input
          type="number"
          className="form-control"
          name="kW"
          value={form.kW}
          onChange={handleChange}
          min={0}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Velocidad(RPM)</label>
        <input
          type="number"
          className="form-control"
          name="RPM"
          value={form.RPM}
          onChange={handleChange}
          min={0}
          required
        />
      </div>
      <div className="d-flex justify-content-between align-items-end mt-4">
        {onDelete && (
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
                <p>¿Seguro que deseas eliminar este equipo?</p>
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
