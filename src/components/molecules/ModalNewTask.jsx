import Title from "../atoms/Title";

import { useElementColors } from "../../hooks/useElementColors";

import { useState } from "react";

const ModalNewTask = ({ isOpen, onClose, onSave }) => {
  const { navigationColor, navigationBgColor } = useElementColors();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    setError("");
    onSave({
      title,
      description,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
      priority,
      status: false,
    });

    setTitle("");
    setDescription("");
    setExpirationDate("");
    setPriority(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded max-w-md w-full">
        <Title text="Nueva Tarea" />

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Título *"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded p-2 w-full mb-3"
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border rounded p-2 w-full mb-3"
          rows={3}
        />
        <input
          type="date"
          value={expirationDate}
          onChange={e => setExpirationDate(e.target.value)}
          className="border rounded p-2 w-full mb-3"
        />
        <select
          value={priority}
          onChange={e => setPriority(Number(e.target.value))}
          className="border rounded p-2 w-full mb-4"
        >
          <option value={0}>Baja</option>
          <option value={1}>Media</option>
          <option value={2}>Alta</option>
        </select>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 rounded bg-red-100 text-red-600 font-medium hover:bg-red-200 active:scale-95 transition-all shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="w-full py-2 rounded text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-sm"
            style={{ color: navigationColor, backgroundColor: navigationBgColor }}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNewTask;