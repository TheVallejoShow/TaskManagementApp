import { useElementColors } from "../../hooks/useElementColors";

const BtnNewProject = ({ handleClick}) => {
    const { navigationColor, navigationBgColor } = useElementColors();

    return (
        <button
            onClick={ handleClick }
            className="mb-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            style={{ color: navigationColor, backgroundColor: navigationBgColor }}
        >
            <span>+ Nuevo Proyecto</span>
        </button>
    );
};

export default BtnNewProject;