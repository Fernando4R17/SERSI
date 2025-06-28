import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { hardwareApi } from "../services";
import { getHardwareArray } from "../utils/apiResponseHelper";
import HardwareTable from "../components/hardware/HardwareTable";
import HardwareForm from "../components/hardware/HardwareForm";
import { toastManager } from "../utils/toast";
import type { Hardware } from "../utils/types";

export default function Hardware(){
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editHardware, setEditHardware] = useState<Hardware | null>(null);
    const queryClient = useQueryClient();

    const { data: hardwareData, isLoading, isError } = useQuery({
        queryKey: ["hardware", search],
        queryFn: () =>
            search.trim()
                ? hardwareApi.search(search.trim())
                : hardwareApi.getAll(),
    });

    const hardware = getHardwareArray(hardwareData);

    const createHardwareMutation = useMutation({
        mutationFn: (hardwareData: Partial<Hardware>) => hardwareApi.create(hardwareData as Omit<Hardware, 'id' | 'created_at' | 'updated_at'>),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["hardware"] });
            setModalOpen(false);
            setEditHardware(null);
            setSearch("");
            toastManager.success(response.message, "Equipo creado");
        },
        onError: (error: Error) => {
            toastManager.error(error.message, "Error al crear equipo");
        }
    });

    const updateHardwareMutation = useMutation({
        mutationFn: ({ id, ...hardwareData }: Hardware) => hardwareApi.update(id, hardwareData),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["hardware"] });
            setModalOpen(false);
            setEditHardware(null);
            setSearch("");
            toastManager.success(response.message, "Equipo actualizado");
        },
        onError: (error: Error) => {
            toastManager.error(error.message, "Error al actualizar equipo");
        }
    });

    const deleteHardwareMutation = useMutation({
        mutationFn: (id: number) => hardwareApi.delete(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["hardware"] });
            setModalOpen(false);
            setEditHardware(null);
            setSearch("");
            toastManager.success(response.message, "Equipo eliminado");
        },
        onError: (error: Error) => {
            toastManager.error(error.message, "Error al eliminar equipo");
        }
    });

    const handleAdd = () => {
        setEditHardware(null);
        setSearch("");
        setModalOpen(true);
    };

    const handleEdit = (hw: Hardware) => {
        setEditHardware(hw);
        setSearch("");
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setEditHardware(null);
    };

    const handleSubmit = (values: Partial<Hardware>) => {
        if (editHardware) {
            updateHardwareMutation.mutate({ ...values, id: editHardware.id } as Hardware);
        } else {
            createHardwareMutation.mutate(values);
        }
    };

    const handleDelete = () => {
        if (editHardware) {
            deleteHardwareMutation.mutate(editHardware.id);
        }
    };

    return(
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                <div className="text-center flex-grow-1 justify-content-start">
                                    <h2 className="mb-0">Equipos</h2>
                                    <small className="text-white-50">Lista de Equipos</small>
                                </div>
                                <div className="d-flex flex-grow-1 justify-content-center">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm w-100"
                                        style={{ maxWidth: 300 }}
                                        placeholder="Buscar equipo..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex flex-grow-1 justify-content-end">
                                    <button className="btn btn-light btn-sm" onClick={handleAdd}>Agregar Equipo</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body bg-light">
                            {isLoading ? (
                                <p>Cargando equipos...</p>
                            ): isError ? (
                                <p>Error al cargar equipos...</p>
                            ) : (
                                <div className="table-responsive">
                                    <HardwareTable hardware={hardware} onEdit={handleEdit}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {modalOpen && (
                <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editHardware ? "Editar Equipo" : "Agregar Equipo"}</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <HardwareForm
                                    initialValues={editHardware || {}}
                                    onSubmit={handleSubmit}
                                    onClose={handleClose}
                                    onDelete={editHardware ? handleDelete : undefined}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}