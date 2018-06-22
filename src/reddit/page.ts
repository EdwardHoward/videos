import {} from 'whatwg-fetch';
declare var YT;
import Story from './story';

export default class Page {
    stories: Array<Story>;
    currentStory = 0;
    constructor(subreddit: string){
        this.stories = [];
        const url = `https://www.reddit.com/r/${subreddit}.json`;

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

        new YT.Player('video', {
            host:'https://www.youtube.com',
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