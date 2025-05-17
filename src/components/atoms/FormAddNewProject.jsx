import { useState } from "react";

const FormAddNewProject = ({ onCreate, onClose }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            name: name.trim(),
            image: image.trim() || "",
            description: desc.trim() || "",
            tasks: [],
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Nombre del proyecto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border px-3 py-2 rounded"
                />

                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border px-3 py-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Descripción"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="border px-3 py-2 rounded"
                />
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-600 hover:text-black"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear
                </button>
            </div>
        </form>
    );
};

export default FormAddNewProject;