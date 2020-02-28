import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import SearchOptions from '../Atoms/SearchOptions';
import './DashboardStyles/DashboardStyles.css';

class Dashboard extends Component {
    state = {
        title: 'Top Videos'
    }
    
    handleTitleState = (title) => {
        this.setState({
            title
        });
    }

    render () {
        return (
            <div className="Dashboard">
                <div className="Dashboard__search-options">
                    <h1>{this.state.title}</h1>
                    <SearchOptions handleTitleState={this.handleTitleState}/>
                </div>
                <div className="Dashboard__video-cards">
                    <VideoCardList/>
                </div>
            </div>
        )
    }
}

export default Dashboard;