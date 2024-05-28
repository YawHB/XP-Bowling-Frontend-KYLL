import { toast } from 'react-toastify';

interface SuccessMessageProps {
    messageString: string;
}

const SuccessMessage = ({ messageString }: SuccessMessageProps) => {
    toast.success(messageString, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export default SuccessMessage;
