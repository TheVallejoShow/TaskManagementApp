import ModalNewProject from "../molecules/ModalNewProject";
import BtnNewProject from "../atoms/BtnNewProject";
import ProjectBox from "../molecules/ProjectBox";
import ErrorMessage from "../atoms/ErrorMessage";
import Search from "../atoms/Search";
import Title from "../atoms/Title";

import { onGetProjects } from "../../db/firebase";
import { useState, useEffect } from "react";

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [showModal, setShowModal] = useState(false);

    const handleCreateProject = (newProject) => {
        setProjects(prev => [...prev, { id: Date.now(), ...newProject }]);
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
                    onCreate={ handleCreateProject }
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
                        />
                    ))
                ) : (
                    <div className="col-span-full">
                        <ErrorMessage text="No se encontraron proyectos disponibles." />
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;