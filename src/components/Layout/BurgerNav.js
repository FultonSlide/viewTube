import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './BurgerNavStyles/BurgerNavStyles.css';

class BurgerNav extends Component {
    state = {
        navActive: false,
        navDetail: '',
        navTo: ''
    }

    handleClick = () => {
        if(this.props.location.pathname === '/watchlater'){
            this.setState({
                navActive: !this.state.navActive,
                navDetail: 'Popular Videos',
                navTo: '/'
            });
        } else {
            this.setState({
                navActive: !this.state.navActive,
                navDetail: 'Watch Later',
                navTo: '/watchlater'
            });
        }
    }

    render() {
        return (
            <div className="BurgerNav-container">
                <div className={this.state.navActive ? 'BurgerNav BurgerNav--active' : 'BurgerNav'} onClick={this.handleClick}>
                    <div className={this.state.navActive ? 'BurgerNav__icon BurgerNav--active__icon' : 'BurgerNav__icon'}></div>
                </div>
                <div className={this.state.navActive ? 'BurgerNav__sideDrawer BurgerNav__sideDrawer--active' : 'BurgerNav__sideDrawer'}>
                    <ul className="BurgerNav__list">
                        <Link to={this.state.navTo} className="BurgerNav__link" onClick={this.handleClick}>
                            <li className="BurgerNav__item">{this.state.navDetail}</li>
                        </Link>
                    </ul>
                </div>
            </div>
        )
    }
};

export default withRouter(BurgerNav);