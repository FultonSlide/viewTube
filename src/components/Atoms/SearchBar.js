import React, { Component } from 'react';
import Button from './Button';
import SearchSVG from './SearchSVG';
import './SearchBarStyles/SearchBarStyles.css';

class SearchBar extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('search submitted');
    }            

    render() {
        return (
            <form className="SearchBar" onSubmit={this.handleSubmit}>
                <input type="text" className="SearchBar__input" name="Search" placeholder="Search videos" aria-label="Search"/>
                <Button buttonType="submit" buttonName={<SearchSVG/>}/>
            </form>
        )
    }
};

export default SearchBar;