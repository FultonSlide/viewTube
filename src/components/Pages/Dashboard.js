import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import SearchOptions from '../Atoms/SearchOptions';
import './DashboardStyles/DashboardStyles.css';

class Dashboard extends Component {
    state = {
        title: '',
        dataLoaded: false,
        videoData: []
    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            dataLoaded: this.props.dataLoaded,
            videoData: this.props.videoData
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            dataLoaded: nextProps.dataLoaded,
            videoData: nextProps.videoData
        })
    }

    render () {
        let render = this.state.dataLoaded ?  (
            <div className="Dashboard">
                <div className="Dashboard__search-options">
                    <h1>{this.state.title}</h1>
                    <SearchOptions handleTitleState={this.props.handleTitleState} handleFetchTopics={this.props.handleFetchTopics}/>
                </div>
                <div className="Dashboard__video-cards">
                    {this.state.videoData.length > 0 ? <VideoCardList 
                        videoData={this.state.videoData} 
                        addToStorage={this.props.addToStorage} 
                        removeFromStorage={this.props.removeFromStorage}
                        decodeHTML={this.props.decodeHTML}
                    /> : <div>No Videos Found</div>}
                </div>
            </div>
        ): (
            <div className="Dashboard__loading">Loading</div>
        );
        return (
            <div>{render}</div>
        )
    }
}

export default Dashboard;