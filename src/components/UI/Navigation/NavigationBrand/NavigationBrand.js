import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Logo from '../../../../assets/images/logo-invert.png';
import classes from './NavigationBrand.module.css';

const NavigationBrand = () => {
    return (
        <Navbar.Brand>
            <Link to="/" className={classes.brandLink}>
                <img
                    alt="Logo"
                    src={Logo}
                    height="45"
                    className="d-inline-block align-top"
                />{' '}
                <div>Tasker</div>
            </Link>
        </Navbar.Brand>
    )
}

export default NavigationBrand;
