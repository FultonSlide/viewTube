import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '../Atoms/Button';
import './NavbarStyles/NavbarStyles.css';

class Navbar extends Component {
    updateLinkName = () => {
        if(this.props.location.pathname === '/watchlater'){
            return 'Popular Videos';
        } else {
            return 'Watch Later';
        }
    }

    updateLink = () => {
        if(this.props.location.pathname === '/watchlater'){
            return '/';
        } else {
            return '/watchlater';
        }
    }

    handleClick = () => {
        if(this.props.location.pathname === '/watchlater'){
            this.props.handleTopVideosFetch();
        }
    }

    render() {
        return (
            <div className="Navbar">
                <ul className="Navbar__list">
                    <li className="Navbar__item">
                        <Link to={this.updateLink()} className="Header__link" onClick={this.handleClick}>
                            <Button buttonType='button' buttonName={this.updateLinkName()}></Button>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
};

export default withRouter(Navbar);