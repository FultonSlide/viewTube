import React from 'react';
import './ButtonStyles/ButtonStyles.css';

const Button = (props) => {
    return (
        <div className="Button">
            <button className="Button__contents">{props.buttonName}</button>
        </div>
    )
};

export default Button;