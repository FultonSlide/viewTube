import React from 'react';
import Button from '../Atoms/Button';

const Navbar = (props) => {
    return (
        <div className="Navbar">
            <ul className="Navbar__list">
                <li className="Navbar__item"><Button buttonName='Watch Later'></Button></li>
            </ul>
        </div>
    )
};

export default Navbar;