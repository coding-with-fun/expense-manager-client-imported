import React, { useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap';
import { UserContext } from '../../context/UserContext';

const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { userToken, setUserToken } = useContext(UserContext);

    const toggle = () => {
        if (document.documentElement.clientWidth < 768) {
            setIsOpen(!isOpen);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('emc-token');
        setUserToken();
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

export default withRouter(TopBar);
