import ErrorIcon from '@mui/icons-material/Error';

const ErrorMessage = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg shadow-sm">
            <ErrorIcon className="w-8 h-8 mb-2" />
            <p className="text-lg">{ text }</p>
        </div>
    );
};

export default ErrorMessage;