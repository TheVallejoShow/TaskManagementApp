import { useState } from "react";
import { useElementColors } from "../../hooks/useElementColors";

const FormAddNewProject = ({ onCreate, onClose }) => {
    const { navigationColor, navigationBgColor } = useElementColors();
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
            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2 rounded bg-red-100 text-red-600 font-medium hover:bg-red-200 active:scale-95 transition-all shadow-sm"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="w-full py-2 rounded text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-sm"
                    style={{ color: navigationColor, backgroundColor: navigationBgColor }}
                >
                    Crear
                </button>
            </div>
        </form>
    );
};

export default FormAddNewProject;