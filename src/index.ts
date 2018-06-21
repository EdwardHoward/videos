import {} from 'whatwg-fetch';
declare var YT;

class Page {
    stories: Array<Story>;
    currentStory = 0;
    constructor(subreddit: string){
        this.stories = [];
        let url = `https://www.reddit.com/r/${subreddit}.json`;

        fetch(url)
            .then(res => res.json())
            .then(res => { 
                this.stories = res.data.children.map(story => new Story(story));
                this.render();
            });
    }

    addStory(story: Story){
        this.stories.push(story);
    }

    render(){
        let elem = document.createElement('div');
        elem.classList.add('player');
        elem.appendChild(this.stories[this.currentStory].render());

        document.getElementById('root').innerHTML = elem.outerHTML;

        console.log(YT);
        new YT.Player('video', {
            events: {
              'onReady': (r) => { r.target.playVideo(); },
              'onStateChange': e => {
                  if(e.data == 0){
                      this.next();
                  }
              }
            }
          });
        return elem;
    }

    next(){
        this.currentStory++;
        this.render();
    }

    prev(){
        this.currentStory--;
        this.render();
    }
}
class Story {
    data;
    private _comments;
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
        elem.innerHTML = this.data.title;
        
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
            fetch(`https://api.reddit.com${this.data.permalink}`)
            .then(res => res.json())
            .then(res => { console.log(res); }); //`https://api.reddit.com/r/${this.data.subreddit}/comments/${this.data.id}.json?sort=${options.commentSort}&limit=${options.commentLimit}`;
        }
    }
}

class Video {
    data;
    constructor(embed){
        this.data = embed;
    }

    render(){
        let elem = document.createElement('div');
        elem.innerHTML = this.htmlDecode(this.data.html);

        elem.getElementsByTagName('iframe')[0].id = "video";


        return elem;
    }

    htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }
}

document.addEventListener('DOMContentLoaded', () => {
    var page = new Page("Roadcam");
    document.addEventListener('keyup', (e) => {
        if(e.which == 37){
            page.prev();
        }else if(e.which == 39){
            page.next();
        }
    });
});
