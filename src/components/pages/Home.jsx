import { useElementColors } from "../../hooks/useElementColors";

const Home = () => {
    const { titlesColor } = useElementColors();

    return (
        <h1 className="text-2xl font-bold mb-4" style={{ color: titlesColor }}>Mis Tareas</h1>
    );
};

export default Home;