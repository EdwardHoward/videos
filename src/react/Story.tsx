import * as React from 'react';
import Video from './Video';
import Display from './Display';

export default class Story extends React.Component<{story}> {
    private _isActive: boolean = false;

    render(){
        console.log(this.props);
        if(this.props.story){
            const data = this.props.story.data;
            
            return (
                <div className="header">
                    <Display story={data} />
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