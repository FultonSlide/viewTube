import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from './Button';
import SearchSVG from './SearchSVG';
import './SearchBarStyles/SearchBarStyles.css';

class SearchBar extends Component {
    state = {
        query: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.search(this.state.query);
        this.props.history.push('/');
    }            

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <form className="SearchBar" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <input type="text" className="SearchBar__input" name="Search" placeholder="Search videos" aria-label="Search"/>
                <Button buttonType="submit" buttonName={<SearchSVG/>}/>
            </form>
        )
    }
};

export default withRouter(SearchBar);