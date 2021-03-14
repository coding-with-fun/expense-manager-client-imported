import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap";

const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        if (document.documentElement.clientWidth < 768) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <Navbar light expand="md">
            <Link to="/" className="navbar-brand">
                Expense Manager
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar className="justify-content-end">
                <Nav className="me-auto" navbar>
                    {window.location.pathname !== "/" && (
                        <NavItem>
                            <Link to="/" className="nav-link" onClick={toggle}>
                                Home
                            </Link>
                        </NavItem>
                    )}
                    {window.location.pathname !== "/signin" && (
                        <NavItem>
                            <Link
                                to="/signin"
                                className="nav-link"
                                onClick={toggle}>
                                Sign In
                            </Link>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default withRouter(TopBar);
