import { toast } from 'react-toastify';

interface FailMessageProps {
    messageString: string;
}

const FailMessage = ({ messageString }: FailMessageProps) => {
    toast.error(messageString, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

export default FailMessage;
