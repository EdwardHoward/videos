import * as React from 'react';
declare var YT;

export interface VideoProps {
    story;
}

export default class Video extends React.Component<VideoProps, any> {
    ref;
    constructor(props){
        super(props);

        this.ref = React.createRef();
    }
    render() {
        return (
            <div ref={this.ref} dangerouslySetInnerHTML={{ __html: this.getVideoUrl(this.props.story) }} />
        );
    }

    component
    componentDidUpdate(){
        this.playVideo();
    }

    componentDidMount(){
        //this.playVideo();
    }

    playVideo(){
        const frame = this.ref.current.getElementsByTagName('iframe');
        if(!frame[0]) return;

        frame[0].id = "video";
        new YT.Player('video', {
            host:'https://www.youtube.com',
            events: {
              'onReady': (r) => { r.target.playVideo(); },
              'onStateChange': e => {
                  if(e.data == 0){
                      //this.next();
                  }
              }
            }
          });
    }

    getVideoUrl(story) {
        if (story.secure_media) {
            return this.htmlDecode(story.secure_media.oembed.html);
        }
    }

    htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
}
