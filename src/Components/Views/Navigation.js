import React, {useEffect, useState} from 'react';
import {Nav, Navbar, Modal} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import axios from "axios";

function Navigation({setUser, setAuth,user}) {

    function logout(e) {
        e.preventDefault()
        setAuth(false)
        setUser(null)
        localStorage.removeItem("token")
    }
    console.log("hihi")
    return (
        <Navbar bg="transparent" expand="lg" className="text-center w-100">
            <h3 className="px-4">React Fitness</h3>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="bg-white">

                <Nav className="ml-auto">
                    <NavLink to="/home" className="navButton font-monospace nav-link">Home</NavLink>
                    <NavLink to="/" className="navButton font-monospace nav-link"> About</NavLink>
                </Nav>
                {user ? <>

                    <NavLink to="/profile" className="navButton font-monospace text-dark nav-link">{user.name}'s
                        Page</NavLink>
                    <NavLink to="/login" onClick={logout}
                             className="navButton font-monospace text-dark nav-link">Logout</NavLink>


                </> : <>
                    <NavLink to="/login" className="navButton font-monospace text-dark nav-link">Login</NavLink>
                    <NavLink to="/register" className="navButton font-monospace text-dark nav-link">Register</NavLink>
                </>}


            </Navbar.Collapse>
            {user ?
                <Nav className=" align-self-end px-3">
                    <h4>Welcome Back, {user.name}!</h4>
                </Nav> : null

            }
        </Navbar>
            );
}

export default Navigation;
