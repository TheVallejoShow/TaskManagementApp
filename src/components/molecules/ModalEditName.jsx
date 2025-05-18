import { useElementColors } from "../../hooks/useElementColors";
import SubTitle from "../atoms/SubTitle";
import { useState } from "react";

const ModalEditName = ({ currentName, onClose, onConfirm }) => {
    const { navigationColor, navigationBgColor } = useElementColors();
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newName.trim() !== "") {
      onConfirm(newName.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
        style={{ maxWidth: "95%" }}
      >
        <SubTitle text="Cambiar nombre del proyecto" />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          required
          autoFocus
        />
        <div className="flex gap-4 mt-3">
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
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalEditName;