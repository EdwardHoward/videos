export default class Video {
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