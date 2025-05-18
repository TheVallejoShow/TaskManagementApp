import { useElementColors } from "../../hooks/useElementColors";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const BtnNewElement = ({ handleClick, text }) => {
    const { navigationColor, navigationBgColor } = useElementColors();

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center gap-2 w-full md:w-48 py-3 rounded-xl font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ color: navigationColor, backgroundColor: navigationBgColor }}
        >
            <AddCircleOutlineIcon className="w-8 h-8" style={{ fontSize: "1rem" }} />
            <span className="pl-2">{ text }</span>
        </button>
    );
};

export default BtnNewElement;