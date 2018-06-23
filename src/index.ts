import Page from "./reddit/Page";
// import './styles/main';
import { From } from './reddit/From';
// document.addEventListener('DOMContentLoaded', () => {
//     var page = new Page("Videos");
//     document.addEventListener('keyup', (e) => {
//         if(e.which == 37){
//             page.prev();
//         }else if(e.which == 39){
//             page.next();
//         }
//     });

//     document.getElementById('next').addEventListener('click', function(){ 
//         page.next();
//     });
//     document.getElementById('prev').addEventListener('click', function(){ 
//         page.prev();
//     });
// });

class Component{
    protected props;
    constructor(props){
        this.props = props;
    }
}

class Text extends Component{

    onClick(){

    }

    render(){    
        return From.createElement(
            'div', 
            {class: 'header'}, 
            From.createElement(
                'h1', 
                {onClick: this.onClick}, 
                this.props.text
            )
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').appendChild(
        From.createElement(Text, {text: 'header'})
    );
});