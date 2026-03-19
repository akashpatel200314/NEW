import React, { useContext, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogin() {

    const usernameRef = useRef();
    const pinRef = useRef();

    const [, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const pin = pinRef.current.value;

        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        if (!/^\d{7}$/.test(pin)) {
            alert("Your pin is not a 7-digit number!");
            return;
        }

        fetch("https://cs571api.cs.wisc.edu/rest/s26/hw6/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else if (res.status === 200) {
                alert("You have been successfully logged in!");
                setLoginStatus(username);
                sessionStorage.setItem("loginStatus", username);
                navigate("/");
            }
        });
    };

    return <>
        <h1>Login</h1>

        <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="loginUsername">Username</Form.Label>
                <Form.Control
                    id="loginUsername"
                    ref={usernameRef}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="loginPin">Password</Form.Label>
                <Form.Control
                    id="loginPin"
                    type="password"
                    ref={pinRef}
                />
            </Form.Group>

            <Button type="submit">Login</Button>

        </Form>
    </>
}