import Fade from '@material-ui/core/Fade';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/index.scss';

ReactDOM.render(
    <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        TransitionComponent={Fade}
        dense
        autoHideDuration={3000}>
        <App />
    </SnackbarProvider>,
    document.getElementById('root')
);
