import { useElementColors } from "../../hooks/useElementColors";

const ProjectBox = ({ id, image, name, desc, amountTasks }) => {
    const { subTitlesColor } = useElementColors();

    return (
        <div key={ id } className="relative bg-white rounded shadow p-4 flex flex-col">
            <img
                src={image}
                alt={`Imagen del proyecto ${ name }`}
                className="w-full h-32 object-cover rounded mb-3"
                loading="lazy"
            />
            <div className="flex flex-col justify-between items-center mb-2">
                <h2 className="w-full text-center text-xl font-semibold" style={{ color: subTitlesColor }}>{ name }</h2>
                <div>
                    <p className="m-2">{ desc }</p>
                </div>
            </div>
            <p className="text-gray-600">
                {amountTasks} {amountTasks === 1 ? "tarea" : "tareas"}
            </p>
        </div>
    );
};

export default ProjectBox;