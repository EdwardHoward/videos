export default class From {

    static createElement(component, props, ...children){
        let element;
        if(typeof component === "string"){
            element = document.createElement(component);
        }
        
        children.forEach(child => {
            if(typeof child === "string"){
                element.innerHTML += child;
            }else{
                element.appendChild(child);
            }
        });
        // element.innerHTML = "test";
        return element;
    }
}

