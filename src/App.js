import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkUserAuthentication } from './actions/authActions';
import WrappedRoutes from './routes/WrappedRoutes';

axios.defaults.withCredentials = true;

function App({ dispatch }) {
    const [loadingToken, setLoadingToken] = useState(true);

    useEffect(() => {
        setTimeout(function () {
            dispatch(checkUserAuthentication());
            setLoadingToken(false);
        }, 3000);
        // eslint-disable-next-line
    }, []);

    return <WrappedRoutes loadingToken={loadingToken} />;
}

export default connect()(App);
