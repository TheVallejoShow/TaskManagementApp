import ModalNewProject from "../molecules/ModalNewProject";
import BtnNewProject from "../atoms/BtnNewProject";
import ProjectBox from "../molecules/ProjectBox";
import ErrorMessage from "../atoms/ErrorMessage";
import SuccessAlert from "../atoms/SuccessAlert";
import ErrorAlert from "../atoms/ErrorAlert";
import Search from "../atoms/Search";
import Title from "../atoms/Title";

import { addProject, onGetProjects, updateProjectName, deleteProject } from "../../db/firebase";
import { useState, useEffect } from "react";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateProject = async (data) => {
        try {
            await addProject(data);
            setSuccessMessage("Proyecto creado exitosamente");
        } catch (error) {
            console.error(error);
            setErrorMessage("Error al crear el proyecto");
        }
    };

    const handleUpdateName = async (id, newName) => {
        try {
            await updateProjectName(id, newName);
            setSuccessMessage("Nombre del proyecto actualizado");
        } catch (error) {
            console.error(error);
            setErrorMessage("Error actualizando el nombre del proyecto");
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            setSuccessMessage("Proyecto eliminado exitosamente");
        } catch (error) {
            console.error(error);
            setErrorMessage("Error eliminando el proyecto");
        }
    };

    useEffect(() => {
        const unsubscribe = onGetProjects((res) => {
            const fetchedProjects = [];

            res.forEach(doc => {
                const project = doc.data();
                fetchedProjects.push({ id: doc.id, ...project });
            });

            setProjects(fetchedProjects);
        });

        return () => unsubscribe && unsubscribe();
    }, []);

    useEffect(() => {
        setFilteredProjects(
            projects.filter(p =>
                p.name.toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, projects]);

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Title text="Gestión de Proyectos" />

            <Search
                placeholder={"Buscar proyectos..."}
                value={filterText}
                handleChange={e => setFilterText(e.target.value)}
                ariaLabel={"Buscar proyectos"}
            />

            <BtnNewProject handleClick={() => setShowModal(true)} />

            {showModal && (
                <ModalNewProject
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateProject}
                />
            )}

            <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                        <ProjectBox
                            key={project.id}
                            id={project.id}
                            image={project.image}
                            name={project.name}
                            desc={project.description}
                            amountTasks={project.tasks?.length || 0}
                            onUpdateName={handleUpdateName}
                            onDeleteProject={handleDeleteProject}
                        />
                    ))
                ) : (
                    <div className="col-span-full">
                        <ErrorMessage text="No se encontraron proyectos disponibles." />
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

export default Home;