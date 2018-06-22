import Video from "./video";

export default class Story {
    private _comments;
    data;
    video;

    showing = false;
    constructor(data){
        this.data = data.data;
        if(this.data.secure_media && this.data.secure_media.oembed){
            this.video = new Video(this.data.secure_media.oembed);
        }
    }

    render(){
        let elem = document.createElement('div');
        elem.innerHTML = `<a target='_blank' href='http://reddit.com${this.data.permalink}'>${this.data.title}</a>`;
        
        if(this.video){
            elem.appendChild(this.video.render());
        }

        
        elem.addEventListener('click', () => {
            let comments = this.comments;

        })
        return elem;
    }



    get comments(){
        if(this._comments){
            return this._comments;
        }else{
            fetch(`http://api.reddit.com${this.data.permalink}`)
            .then(res => res.json())
            .then(res => { console.log(res); }); //`https://api.reddit.com/r/${this.data.subreddit}/comments/${this.data.id}.json?sort=${options.commentSort}&limit=${options.commentLimit}`;
        }
    }
}