import ModalConfirmDelete from "./ModalConfirmDelete";
import ModalEditName from "./ModalEditName";

import { useElementColors } from "../../hooks/useElementColors";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import defaultImage from "../../assets/pictures/noimage.png";

const ProjectBox = ({ id, image, name, desc, amountTasks, onUpdateName, onDeleteProject }) => {
    const { titlesColor, subTitlesColor } = useElementColors();
    const [menuOpen, setMenuOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState(image || defaultImage);

    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const openEditModal = () => {
        setMenuOpen(false);
        setEditModalOpen(true);
    };
    const openDeleteModal = () => {
        setMenuOpen(false);
        setDeleteModalOpen(true);
    };

    const navigate = useNavigate();

    const goToProjectDetail = () => {
        navigate(`/project/${id}`);
    };

    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div key={id} className="relative bg-white rounded shadow p-4 flex flex-col">
            <img
                src={imgSrc}
                alt={`Imagen del proyecto ${name}`}
                className="cursor-pointer w-full h-32 object-cover rounded mb-3"
                loading="lazy"
                onError={() => setImgSrc(defaultImage)}
                onClick={goToProjectDetail}
            />

            <div className="absolute top-2 right-2">
                <button
                    ref={buttonRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu();
                    }}
                    aria-label="Opciones del proyecto"
                    className="text-gray-500 hover:text-gray-700"
                >
                    <MoreVertIcon style={{ marginRight: "-12px", marginTop: "-12px" }}/>
                </button>
                {menuOpen && (
                    <div ref={menuRef} className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10 w-40">
                        <button
                            onClick={openEditModal}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            style={{ color: titlesColor }}
                        >
                            Cambiar nombre
                        </button>
                        <button
                            onClick={openDeleteModal}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                        >
                            Eliminar proyecto
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col justify-between items-center mb-2">
                <h2 
                    onClick={goToProjectDetail}
                    className="cursor-pointer w-full text-center text-xl font-semibold transition-all transform hover:scale-105 active:scale-95" 
                    style={{ color: subTitlesColor }}>
                        {name}
                </h2>
                <div>
                    <p className="m-2">{desc}</p>
                </div>
            </div>
            <p className="text-gray-600">
                {amountTasks} {amountTasks === 1 ? "tarea" : "tareas"}
            </p>

            {editModalOpen && (
                <ModalEditName
                    currentName={name}
                    onClose={() => setEditModalOpen(false)}
                    onConfirm={(newName) => {
                        onUpdateName(id, newName);
                        setEditModalOpen(false);
                    }}
                />
            )}

            {deleteModalOpen && (
                <ModalConfirmDelete
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => {
                        onDeleteProject(id);
                        setDeleteModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default ProjectBox;