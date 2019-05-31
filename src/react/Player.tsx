import * as React from 'react';
import Story from './Story';
import '../styles/main';
import Playlist from './Playlist';

export interface PlayerProps {
    match;
}
export class Player extends React.Component<PlayerProps, {stories, currentStory: number, page}>{
    constructor(props){
        super(props);
        this.state = {page: {}, stories: [], currentStory: 0};
        this.nextStory = this.nextStory.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevStory = this.prevStory.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    getReddit(){

    }

    componentDidMount(){
        const url = `https://www.reddit.com/r/${this.props.match.params.subreddit}.json`;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({page: res.data, stories: res.data.children});
            });
    }

    render(){
        return (
            <div className="container">
                <Story story={this.state.stories[this.state.currentStory]} next={this.nextStory} prev={this.prevStory}/>
                <Playlist stories={this.state.stories} current={this.state.currentStory} onSelect={this.onSelect}/>
                {this.state.currentStory > 0 ? (<div className="nav prev" onClick={this.prevStory}>prev</div>) : null}
                <div className="nav next" onClick={this.nextStory}>next</div>
            </div>
        );
    }

    onSelect(i){
        this.setState({currentStory: i});
    }

    nextStory(){
        let next = this.state.currentStory + 1;
        if(next >= this.state.stories.length){
            this.nextPage();
        }else{
            this.setState({currentStory: next});
        }
        
    }
    prevStory(){
        let prev = this.state.currentStory - 1;
        if(prev < 0){
            //this.prevPage();
        }else{
            this.setState({currentStory: prev});
        }
        
    }

    nextPage(){
        const url = `https://www.reddit.com/r/${this.props.match.params.subreddit}/.json?after=${this.state.page.after}`;
        fetch(url)
            .then(res => res.json())
            .then(res => { 
                this.setState({page: res.data, stories: this.state.stories.concat(res.data.children)});
            });
    }

    prevPage(){
        // const url = `https://www.reddit.com/r/${this.props.subreddit}.json`;

        // fetch(url)
        //     .then(res => res.json())
        //     .then(res => { 
        //         console.log(res.data);
        //         this.setState({page: res.data, stories: res.data.children});
        //     });
    }
}

