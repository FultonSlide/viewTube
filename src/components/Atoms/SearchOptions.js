import React, { Component } from 'react';
import './SearchOptionsStyles/SearchOptionsStyles.css';

class SearchOptions extends Component {
    handleClick = (e) => {
        e.stopPropagation();
        this.props.handleTitleState(e.target.innerText);
        this.props.handleFetchTopics(e.target.innerText);
    }

    render() {
        return (
            <div className="SearchOptions">
                <ul className="SearchOptions__list" onClick={this.handleClick}>
                    <li className="SearchOptions__item">Music</li>
                    <li className="SearchOptions__item">Gaming</li>
                    <li className="SearchOptions__item">Sports</li>
                </ul>
            </div>
        )
    }
};

export default SearchOptions;