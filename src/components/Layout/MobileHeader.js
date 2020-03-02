import React from 'react';
import { Link } from 'react-router-dom';
import BurgerNav from './BurgerNav';
import LogoIconSVG from '../Atoms/LogoIconSVG';
import MobileViewtubeTitle from '../../assets/logos/Title.svg';
import SearchBar from '../Atoms/SearchBar';
import './MobileHeaderStyles/MobileHeaderStyles.css';

const MobileHeader = (props) => {
    return (
        <div className="MobileHeader">
            <div className="MobileHeader__nav">
                <Link to={'/'} className="MobileHeader__link" onClick={props.handleTopVideosFetch}>
                    <LogoIconSVG className="MobileHeader__logo"/>
                </Link>
                <Link to={'/'} className="MobileHeader__link" onClick={props.handleTopVideosFetch}>
                    <img src={MobileViewtubeTitle} alt="viewTube" className="MobileHeader__title"/>
                </Link>
                <BurgerNav/>
            </div>
            <div className="MobileHeader__search">
                <SearchBar search={props.search}/>
            </div>
        </div>
    );
};

export default MobileHeader;