import React, { Component } from 'react';
import './BurgerNavStyles/BurgerNavStyles.css';

class BurgerNav extends Component {
    state = {
        navActive: false
    }

    handleClick = () => {
        this.setState({
            navActive: !this.state.navActive
        });
    }

    render() {
        return (
            <div className={this.state.navActive ? 'BurgerNav BurgerNav--active' : 'BurgerNav'} onClick={this.handleClick}>
                <div className={this.state.navActive ? 'BurgerNav__icon BurgerNav--active__icon' : 'BurgerNav__icon'}></div>
            </div>
        )
    }
};

export default BurgerNav;