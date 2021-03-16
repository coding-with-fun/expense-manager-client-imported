import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = (message, type) => {
    if (type === 'success') toast.success(message);
    if (type === 'warn') toast.warn(message);
    if (!type) toast.error(message);
};

export default ToastNotification;
