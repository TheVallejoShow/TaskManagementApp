import { useElementColors } from "../../hooks/useElementColors";

const Title = ({ text }) => {
    const { titlesColor } = useElementColors();

    return (
        <h1 className="text-center text-3xl font-bold mb-6" style={{ color: titlesColor }}>{ text }</h1>
    );
};

export default Title;