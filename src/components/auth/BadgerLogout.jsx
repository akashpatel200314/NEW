import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

export default function BadgerLogout() {

    const [, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/s26/hw6/logout", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(() => {
            setLoginStatus("");
            sessionStorage.removeItem("loginStatus");
            alert("You have been logged out!");
            navigate("/");
        });
    }, []);

    return (
        <>
            <h1>Logout</h1>
            <p>You have been successfully logged out.</p>
        </>
    );
}