import * as React from 'react';

export interface DisplayProps {
    story;
}

export default class Display extends React.Component<DisplayProps, any> {
    render() {
        return (
            <div className="display">
                <a target='_blank' href={`https://reddit.com${this.props.story.permalink}`}>
                    <span>{this.props.story.title}</span>
                </a>
            </div>
        );
    }
}
