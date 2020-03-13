import React, { Component } from 'react';
import VideoCardList from '../Layout/VideoCardList';
import SearchOptions from '../Atoms/SearchOptions';
import Button from '../Atoms/Button';
import './DashboardStyles/DashboardStyles.css';

class Dashboard extends Component {
    state = {
        title: '',
        dataLoaded: false,
        videoData: [],
        nextPageToken: '',
        prevPageToken: '',
        error: false,
        errorMsg: ''
    }

    componentDidMount() {
        this.setState({
            dataLoaded: this.props.dataLoaded,
            videoData: this.props.videoData,
            nextPageToken: this.props.nextPageToken,
            prevPageToken: this.props.prevPageToken,
            error: this.props.error,
            errorMsg: this.props.errorMsg
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            dataLoaded: nextProps.dataLoaded,
            videoData: nextProps.videoData,
            nextPageToken: nextProps.nextPageToken,
            prevPageToken: nextProps.prevPageToken,
            error: nextProps.error,
            errorMsg: nextProps.errorMsg
        })
    }

    handleNextPageNav = () => {
        this.props.handleChangePage(this.state.nextPageToken);
    }

    handlePrevPageNav = () => {
        this.props.handleChangePage(this.state.prevPageToken);
    }

    render () {
        let render;
        if(!this.state.error){
            render = this.state.dataLoaded ?  (
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
                        /> : <div className="Dashboard__error">No Videos Found</div>}
                    </div>
                    <div className="Dashboard__pageNav">
                        {this.state.prevPageToken ? (
                            <div className="Dashboard__prevPage" onClick={this.handlePrevPageNav}>
                                <Button buttonName="Prev Page"></Button>
                            </div>
                        ) : (null)}
                        <div className="Dashboard__nextPage" onClick={this.handleNextPageNav}>
                            <Button buttonName="Next Page"></Button>
                        </div>
                    </div>
                </div>
            ): (
                <div className="Dashboard__loading"><img src={this.props.spinner} alt="loading" className="Dashboard__spinner"/></div>
            );
        } else {
            render = <div className="Dashboard__error">{this.state.errorMsg}</div>
        }
        
        return (
            <div>{render}</div>
        )
    }
}

export default Dashboard;