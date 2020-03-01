import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import SearchOptions from '../Atoms/SearchOptions';
import './DashboardStyles/DashboardStyles.css';

//Old key, quota reached: AIzaSyAqSKoR84MGTlCJ_-YtywCQEucYj-747L4
//Key 2: AIzaSyCnF4i9AoHmwEcLFkVXq95B16mv53kT5p4
//Key 3: AIzaSyC0EQvDgWmnQQbZS_E08Wkcg-E00f5hSeI

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
                    {this.state.videoData.length > 0 ? <VideoCardList videoData={this.state.videoData} addToStorage={this.props.addToStorage}/> : <div>No Videos Found</div>}
                </div>
            </div>
        ): (
            <div>Data Not Loaded</div>
        );
        return (
            <div>{render}</div>
        )
    }
}

export default Dashboard;