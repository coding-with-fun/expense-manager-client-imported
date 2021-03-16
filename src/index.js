import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, Slide } from 'react-toastify';
import App from './App';
import { UserProvider } from './context/UserContext';
import './scss/index.scss';

ReactDOM.render(
    <UserProvider>
        <App />
        <ToastContainer
            newestOnTop={true}
            closeButton={false}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            transition={Slide}
        />
    </UserProvider>,
    document.getElementById('root')
);
