import ModalNewTask from "../molecules/ModalNewTask";
import BtnNewElement from "../atoms/BtnNewElement";
import ErrorMessage from "../atoms/ErrorMessage";
import SuccessAlert from "../atoms/SuccessAlert";
import ErrorAlert from "../atoms/ErrorAlert";
import Loader from "../atoms/Loader";
import Search from "../atoms/Search";
import Title from "../atoms/Title";

import firestoreTimestampToDate from "../../hooks/useFirestoreTimestampToDate";
import { PriorityLabels } from "../../enums/priority";
import { getProjectById, getTasksFromRefs, createTaskAndLinkToProject } from "../../db/firebase";
import defaultImage from "../../assets/pictures/noimage.png";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddTask = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveTask = async (newTaskData) => {
        try {
            const newTaskId = await createTaskAndLinkToProject(projectId, newTaskData);
            setTasks(prev => [...prev, { id: newTaskId, ...newTaskData }]);
            setIsModalOpen(false);
            setSuccessMessage("Tarea creada exitosamente");
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al crear la tarea");
        };
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectById(projectId);
                setProject(projectData);
                const fetchedTasks = await getTasksFromRefs(projectData.tasks || []);
                const tasksWithDates = fetchedTasks.map(task => ({
                    ...task,
                    priorityLabel: PriorityLabels[task.priority] || "Media",
                    expirationDate: task.expirationDate ? firestoreTimestampToDate(task.expirationDate) : null,
                }));
                setTasks(tasksWithDates);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    useEffect(() => {
        setFilteredTasks(
            tasks?.filter(task =>
                task.title.toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, tasks]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage text={error} />;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <Title text={project.name} />
            <div className="flex items-start space-x-6">
                <img
                    src={project.image || defaultImage}
                    alt={`Imagen del proyecto ${project.name}`}
                    className="w-48 h-32 object-cover rounded shadow"
                    loading="lazy"
                    onError={(e) => (e.currentTarget.src = defaultImage)}
                />
                <p className="text-gray-700 flex-1">{project.description || "Sin descripción"}</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <Search
                    placeholder={"Buscar tareas..."}
                    value={filterText}
                    handleChange={e => setFilterText(e.target.value)}
                    ariaLabel={"Buscar tareas"}
                />
                <BtnNewElement handleClick={handleAddTask} text="Agregar tarea" />

                <ModalNewTask
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveTask}
                />
            </div>
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTasks?.length > 0 ? (
                    filteredTasks.map((task, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <h3 className={`font-semibold text-lg mb-1 ${task.status === "Completada" ? "line-through text-gray-400" : "text-gray-800"}`}>
                                    {task.title}
                                </h3>
                                {task.description && (
                                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                )}
                                <p className="text-xs text-gray-500">
                                    <strong>Vence:</strong> {task.expirationDate || "No definida"}<br />
                                    <strong>Prioridad:</strong> {task.priorityLabel}
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    className="text-green-600 hover:text-green-800 transition-colors"
                                    onClick={() => { }}
                                    title={task.status === "Completada" ? "Marcar como pendiente" : "Marcar como completada"}
                                >
                                    {task.state ? "✔️" : "⬜"}
                                </button>

                                <button
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                    onClick={() => { }}
                                    title="Editar tarea"
                                >
                                    ✏️
                                </button>

                                <button
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                    onClick={() => { }}
                                    title="Eliminar tarea"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <ErrorMessage text="No se encontraron tareas vinculadas al proyecto." />
                    </div>
                )}
            </section>

            {successMessage && (
                <SuccessAlert message={successMessage} onClose={() => setSuccessMessage("")} />
            )}
            {errorMessage && (
                <ErrorAlert message={errorMessage} onClose={() => setErrorMessage("")} />
            )}
        </div>
    );
};

export default ProjectDetail;