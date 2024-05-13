import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <ul>
            <li> <NavLink to="/">Home</NavLink></li>
            <li>About</li>
            <li>Contact</li>
            </ul>
        </nav>
        )
}