import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import logo from "../../Assets/img/logo.svg"
const AppNavBar = () => {
    return (
        <div>
            <Navbar  bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <NavLink to="/"><img className="nav-logo" src={logo} alt="logo"/> </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><NavLink to="/">TO-Do List</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/create">Create Todo</NavLink></Nav.Link>
                            <Nav.Link><NavLink to="/text-detection">Text Detection</NavLink></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default AppNavBar;