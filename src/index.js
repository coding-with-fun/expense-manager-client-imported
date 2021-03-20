import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Slide, ToastContainer } from 'react-toastify';
import App from './App';
import { UserProvider } from './context/UserContext';
import './scss/index.scss';
import store from './store';

ReactDOM.render(
    <UserProvider>
        <Provider store={store}>
            <App />
            <ToastContainer
                newestOnTop={true}
                closeButton={false}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                transition={Slide}
            />
        </Provider>
    </UserProvider>,
    document.getElementById('root')
);
