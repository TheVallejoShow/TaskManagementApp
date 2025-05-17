import { useElementColors } from "../../hooks/useElementColors";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const BtnNewProject = ({ handleClick }) => {
    const { navigationColor, navigationBgColor } = useElementColors();

    return (
        <button
            onClick={handleClick}
            className="flex items-center mb-6 px-6 py-2 rounded font-medium text-white shadow-sm transition-all transform hover:scale-105 active:scale-95"
            style={{ color: navigationColor, backgroundColor: navigationBgColor }}
        >
            <AddCircleOutlineIcon className="w-8 h-8" style={{ fontSize: "1rem" }} />
            <span className="pl-2">Nuevo Proyecto</span>
        </button>
    );
};

export default BtnNewProject;