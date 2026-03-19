import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    const [, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !pin) {
            alert("You must provide both a username and pin!");
            return;
        }

        if (!/^\d{7}$/.test(pin) || !/^\d{7}$/.test(confirmPin)) {
            alert("Your pin must be a 7-digit number!");
            return;
        }

        if (pin !== confirmPin) {
            alert("Your pins do not match!");
            return;
        }

        fetch("https://cs571api.cs.wisc.edu/rest/s26/hw6/register", {
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
            if (res.status === 409) {
                alert("That username has already been taken!");
            } else if (res.status === 200) {
                alert("You have successfully registered!");
                setLoginStatus(username);
                sessionStorage.setItem("loginStatus", username);
                navigate("/");
            }
        });
    };

    return <>
        <h1>Register</h1>

        <Form onSubmit={handleRegister}>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerUsername">Username</Form.Label>
                <Form.Control
                    id="registerUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerPin">Password</Form.Label>
                <Form.Control
                    id="registerPin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registerConfirmPin">Repeat Password</Form.Label>
                <Form.Control
                    id="registerConfirmPin"
                    type="password"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                />
            </Form.Group>

            <Button type="submit">Register</Button>

        </Form>
    </>
}