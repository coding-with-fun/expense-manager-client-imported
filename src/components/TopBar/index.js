import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { removeUserToken } from '../../actions/authActions';

const TopBar = ({ userToken, dispatch }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        if (document.documentElement.clientWidth < 768) {
            setIsOpen(!isOpen);
        }
    };

    const handleSignOut = () => {
        dispatch(removeUserToken());
        toggle();
    };

    return (
        <Navbar light expand="md" fixed="top">
            <Link to="/" className="navbar-brand">
                Expense Manager
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className="justify-content-end">
                <Nav className="me-auto" navbar>
                    {window.location.pathname !== '/' && (
                        <NavItem>
                            <Link to="/" className="nav-link" onClick={toggle}>
                                Home
                            </Link>
                        </NavItem>
                    )}
                    {window.location.pathname !== '/signin' && !userToken && (
                        <NavItem>
                            <Link
                                to="/signin"
                                className="nav-link"
                                onClick={toggle}>
                                Sign In
                            </Link>
                        </NavItem>
                    )}
                    {window.location.pathname !== '/transactions' && userToken && (
                        <NavItem>
                            <Link
                                to="/transactions"
                                className="nav-link"
                                onClick={toggle}>
                                Transactions
                            </Link>
                        </NavItem>
                    )}
                    {window.location.pathname !== '/profile' && userToken && (
                        <NavItem>
                            <Link
                                to="/profile"
                                className="nav-link"
                                onClick={toggle}>
                                Profile
                            </Link>
                        </NavItem>
                    )}
                    {userToken && (
                        <NavItem>
                            <Link
                                to="/"
                                className="nav-link"
                                onClick={handleSignOut}>
                                Sign Out
                            </Link>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default withRouter(
    connect((state) => {
        return {
            userToken: state.auth.token,
        };
    })(TopBar)
);
