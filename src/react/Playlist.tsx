import * as React from 'react';

export interface PlaylistProps {
    stories;
    current;
    onSelect;
}

export default class Playlist extends React.Component<PlaylistProps, any> {
    onClick(index){
        this.props.onSelect(index);
    }

    render() {
        const style = {
            transform: `translateX(-${(this.props.current - 1)* 15}%)`
        }
        return (
            <div className="playlist">
                <ul style={style}>
                    {this.props.stories.map((story, i) => {
                        const data = story.data;
                        const selected = i === this.props.current;
                        return (
                            <li className={selected ? 'selected' : ''} onClick={this.onClick.bind(this, i)}>
                                <img src={data.thumbnail} title={data.title} alt={data.title} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
