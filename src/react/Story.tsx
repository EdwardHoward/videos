import * as React from 'react';
import Video from './Video';

export default class Story extends React.Component<{story}> {
    private _isActive: boolean = false;

    render(){
        console.log(this.props);
        if(this.props.story){
            const data = this.props.story.data;
            
            return (
                <div>
                    <a target='_blank' href={`https://reddit.com${data.permalink}`}><h1>{data.title}</h1></a>
                    <Video story={data} />
                </div>
            )
        }
        return null;
    }

    get isActive(): boolean{
        return this._isActive;
    }
}