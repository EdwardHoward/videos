import * as React from 'react';
import Video from './Video';
import Display from './Display';

export interface StoryProps{
    story;
    next;
    prev;
}
export default class Story extends React.Component<StoryProps> {
    private _isActive: boolean = false;

    render(){
        console.log(this.props);
        if(this.props.story){
            const data = this.props.story.data;
            
            return (
                <div className="header">
                    <Display story={data} />
                    <Video story={data} next={this.props.next} prev={this.props.prev}/>
                </div>
            )
        }
        return null;
    }

    get isActive(): boolean{
        return this._isActive;
    }
}