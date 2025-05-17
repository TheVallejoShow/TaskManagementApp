import FormAddNewProject from "../atoms/FormAddNewProject";
import Title from "../atoms/Title";

const ModalNewProject = ({ onClose, onCreate }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <Title text="Nuevo Proyecto" />
                <FormAddNewProject 
                    onCreate={ onCreate }
                    onClose={ onClose }
                />
            </div>
        </div>
    );
};

export default ModalNewProject;