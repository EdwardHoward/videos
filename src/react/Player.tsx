import * as React from 'react';
import Story from './Story';
import '../styles/main';
import 'react-resizable/css/style'
export class Player extends React.Component<{subreddit: string}, {stories, currentStory: number, page}>{
    constructor(props){
        super(props);
        this.state = {page: {}, stories: [], currentStory: 0};
        this.nextStory = this.nextStory.bind(this);
        this.prevStory = this.prevStory.bind(this);
    }
    componentDidMount(){
        const url = `https://www.reddit.com/r/${this.props.subreddit}.json`;

        fetch(url)
            .then(res => res.json())
            .then(res => { 
                console.log(res.data);
                this.setState({page: res.data, stories: res.data.children});
            });
    }

    render(){
        return (
            <div>
                <Story story={this.state.stories[this.state.currentStory]} />
                <div className="nav prev" onClick={this.prevStory}>prev</div>
                <div className="nav next" onClick={this.nextStory}>next</div>
            </div>
        );
    }

    nextStory(){
        let next = this.state.currentStory + 1;
        if(next > this.state.stories.length){
            this.nextStory();
        }else{
            this.setState({currentStory: next});
        }
        
    }
    prevStory(){
        let prev = this.state.currentStory - 1;
        if(prev < 0){
            this.prevPage();
        }else{
            this.setState({currentStory: prev});
        }
        
    }

    nextPage(){
        const url = `https://www.reddit.com/r/${this.props.subreddit}/.json?after=${this.state.page.after}`;
        this.setState({currentStory: 0});
        fetch(url)
            .then(res => res.json())
            .then(res => { 
                console.log(res.data);
                this.setState({page: res.data, stories: res.data.children});
            });
    }

    prevPage(){
        const url = `https://www.reddit.com/r/${this.props.subreddit}.json`;

        fetch(url)
            .then(res => res.json())
            .then(res => { 
                console.log(res.data);
                this.setState({page: res.data, stories: res.data.children});
            });
    }
}

