import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Atoms/Button';
import './NavbarStyles/NavbarStyles.css';

const Navbar = (props) => {
    return (
        <div className="Navbar">
            <ul className="Navbar__list">
                <li className="Navbar__item">
                    <Link to={'/watchlater'} className="Header__link">
                        <Button buttonType='button' buttonName='Watch Later'></Button>
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Navbar;