function Touchy(elem, options){
    // return distance between touch and current drag

    var defaults = {
        getOffset: function(){
            return {x: 0, y: 0}
        },
        onDrag: function(){},
        onDown: function(){},
        onUp: function(){}
    }
    
    var settings = extend(defaults, options);
    elem.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);

    elem.addEventListener('touchstart', onDown);
    window.addEventListener('touchend', onUp);
    window.addEventListener('touchmove', onMove);
    var mouseDown = false;
    var mouseDownCoords = {x: null, y: null};
    var mouseDownTrue = {x: null, y: null};
    var mouseCoords = {x: null, y: null};

    var mouseDownTime = Date.now();

    function normalizeInput(e){
        if((e.clientX && e.clientY) || e.touches){
            return {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY};
        }
    }

    function onDown(e){
        var coords = normalizeInput(e);
        var offset = settings.getOffset(elem);
        mouseDown = true;
        mouseDownCoords = {x: coords.x - offset.x, y: coords.y - offset.y};
        mouseDownTrue = {x: coords.x, y: coords.y};
        mouseCoords = {x: coords.x, y: coords.y};
        mouseDownTime = Date.now();
        settings.onDown(elem);
    }

    function onUp(e){
        mouseDown = false;
        var timeDiff = Date.now() - mouseDownTime;
        settings.onUp(elem, getTrueDiff(), timeDiff);
    }

    function onMove(e){
        var coords = normalizeInput(e);
        if(mouseDown){
            e.preventDefault();
            mouseCoords = {x: coords.x, y: coords.y};
            settings.onDrag(elem, getDiff(), getTrueDiff());
        }
    }
    
    // Get the difference between click position and now with offset
    function getDiff(){
        var x = mouseCoords.x - mouseDownCoords.x;
        var y = mouseCoords.y - mouseDownCoords.y;

        return {x: x, y: y};
    }
    
    // Get the difference between click position and now
    function getTrueDiff(){
        var x = mouseCoords.x - mouseDownTrue.x;
        var y = mouseCoords.y - mouseDownTrue.y;

        return {x: x, y: y};
    }
    
    function extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }
}