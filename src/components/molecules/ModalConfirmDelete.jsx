import { useElementColors } from "../../hooks/useElementColors";

const ModalConfirmDelete = ({ onClose, onConfirm }) => {
    const { navigationColor, navigationBgColor } = useElementColors();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-96" style={{ maxWidth: "95%" }}>
                <h3 className="mb-4 text-lg font-semibold text-red-600">
                    ¿Estás seguro de eliminar este proyecto?
                </h3>
                <div className="flex gap-4 mt-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2 rounded bg-red-100 text-red-600 font-medium hover:bg-red-200 active:scale-95 transition-all shadow-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-full py-2 rounded text-white font-medium hover:brightness-110 active:scale-95 transition-all shadow-sm"
                        style={{ color: navigationColor, backgroundColor: navigationBgColor }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmDelete;