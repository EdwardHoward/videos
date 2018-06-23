export class From {
    static createElement(component, props, ...children){
        props = props || {};
        props.children = children;

        let element;
        if(typeof component === "string"){
            element = document.createElement(component);
        }else if(typeof component === "function"){
            element = new component(props).render();
        }

        children.forEach(child => {
            if(typeof child === "string"){
                element.innerHTML += child;
            }else if(typeof child === "object"){
                element.appendChild(child);
            }else if(typeof child === "function"){
                let res = new child();
                element.appendChild(res.render());
            }
        });

        if(props.class){
            let split = props.class.split(' ');
            split.forEach(cl => element.classList.add(cl));
        }

        if(props.onClick){
            element.addEventListener('click', props.onClick);
        }
        // element.innerHTML = "test";
        return element;
    }
}
