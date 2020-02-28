import React, { Component } from 'react';
import './SearchOptionsStyles/SearchOptionsStyles.css';

class SearchOptions extends Component {
    handleClick = (e) => {
        e.stopPropagation();
        this.props.handleTitleState(e.target.innerText);
    }

    render() {
        return (
            <div className="SearchOptions">
                <ul className="SearchOptions__list" onClick={this.handleClick}>
                    <li className="SearchOptions__item">Trending</li>
                    <li className="SearchOptions__item">Latest</li>
                    <li className="SearchOptions__item">Most Viewed</li>
                </ul>
            </div>
        )
    }
};

export default SearchOptions;