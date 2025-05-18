import { useElementColors } from "../../hooks/useElementColors";

const SubTitle = ({ text }) => {
    const { titlesColor } = useElementColors();

    return (
        <h1 className="text-center text-xl font-bold mb-6" style={{ color: titlesColor }}>{ text }</h1>
    );
};

export default SubTitle;