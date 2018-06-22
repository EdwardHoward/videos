import Page from "./reddit/page";
import './styles/main';
import From from './reddit/From';
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('root').appendChild(
        From.createElement(
            'div', {

            }, 
            From.createElement('h1', {}, 'test')));
});