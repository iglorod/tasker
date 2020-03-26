import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import NavigationLink from './NavigationLink/NavigationLink';
import AuthLinks from './AuthLinks/AuthLinks'; 

const NavigationLinks = () => {
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavigationLink to="/create-task"><FontAwesomeIcon icon={faPlusSquare} /> Create task</NavigationLink>
            </Nav>
            <AuthLinks />
        </Navbar.Collapse>
    )
}

export default NavigationLinks;
