import { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkUserAuthentication } from './actions/authActions';
import WrappedRoutes from './routes/WrappedRoutes';

function App({ dispatch }) {
    useEffect(() => {
        dispatch(checkUserAuthentication());
        // eslint-disable-next-line
    }, []);

    return <WrappedRoutes />;
}

export default connect()(App);
