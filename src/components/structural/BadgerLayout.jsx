import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, Outlet } from 'react-router';
import crest from '../../assets/uw-crest.svg';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLayout(props) {

    const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem("loginStatus") || "");

    return (
        <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>

                            {loginStatus ? (
                                <Nav.Link as={Link} to="/logout">
                                    Logout
                                </Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>

                                    <Nav.Link as={Link} to="/register">
                                        Register
                                    </Nav.Link>
                                </>
                            )}

                            <NavDropdown title="Chatrooms" id="chatroom-nav-dropdown">
                                {props.chatrooms.map(chatroom => (
                                    <NavDropdown.Item
                                        key={chatroom}
                                        as={Link}
                                        to={`/chatrooms/${chatroom}`}
                                    >
                                        {chatroom}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Outlet />
            </Container>

        </BadgerLoginStatusContext.Provider>
    );
}