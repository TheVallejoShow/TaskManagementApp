import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const found = storedProjects.find((p) => p.id === id);
    setProject(found);
  }, [id]);

  if (!project) return <p className="text-center mt-8">Proyecto no encontrado.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={project.image}
        alt={`Imagen del proyecto ${project.name}`}
        className="w-full h-60 object-cover rounded mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-image.jpg";
        }}
      />
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-700 mb-6">{project.description}</p>
      <h2 className="text-xl font-semibold mb-2">Tareas:</h2>
      <ul className="list-disc pl-5">
        {(project.tasks && project.tasks.length > 0) ? (
          project.tasks.map((task, index) => <li key={index}>{task}</li>)
        ) : (
          <li>No hay tareas aún.</li>
        )}
      </ul>
    </div>
  );
};

export default ProjectDetail;