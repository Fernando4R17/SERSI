import type { Hardware } from "../../utils/types"

interface HardwareTableProps {
    hardware: Hardware[];
    onEdit?: (hw: Hardware) => void;
}

export default function HardwareTable({hardware, onEdit}: HardwareTableProps){
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo de Motor</th>
                    <th scope="col">Fecha de Fabricación</th>
                    <th scope="col">kW</th>
                    <th scope="col">RPM</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {hardware.map((hw, idx) => (
                    <tr key={hw.id}>
                        <th scope="row">{idx + 1}</th>
                        <td>{hw.name}</td>
                        <td>{hw.motortype}</td>
                        <td>{hw.fabrication_date}</td>
                        <td>{hw.kW}</td>
                        <td>{hw.RPM}</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit?.(hw)}>Editar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
