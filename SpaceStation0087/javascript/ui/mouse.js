class Mouse {
    #element;
    #x;
    #y;
    #lftClicked = false;
    #rgtClicked = false;
    #dbClicked = false;

    constructor(element){
        this.#element = element;
        element.addEventListener('click', this.onclick.bind(this));
        element.addEventListener('contextmenu', this.oncontextmenu.bind(this));
        element.addEventListener('dblclick', this.ondblclick.bind(this));
        element.addEventListener('mousedown', this.onmousedown.bind(this));
        element.addEventListener('mouseenter', this.onmouseenter.bind(this));
        element.addEventListener('mouseleave', this.onmouseleave.bind(this));
        element.addEventListener('mousemove', this.onmousemove.bind(this));
        element.addEventListener('mouseout', this.onmouseout.bind(this));
        element.addEventListener('mouseover', this.onmouseover.bind(this));
        element.addEventListener('mouseup', this.onmouseup.bind(this));
    }

    //left click
    onclick(event){
        this.#lftClicked = true;
        console.log('Left Clicked', event);
    }

    //rightclick
    oncontextmenu(event){
        event.preventDefault(); // To prevent the context menu from appearing
        this.#rgtClicked = true;
        console.log('Right Clicked', event);
    }
    
    //double click
    ondblclick(event){
        this.#dbClicked = true;
        console.log('Double Clicked', event);
    }

    onmousedown(event){
        this.#lftClicked = true;
        console.log('Mouse Down', event);
    }

    onmouseenter(event){
        console.log('Mouse Enter', event);
    }

    onmouseleave(event){
        console.log('Mouse Leave', event);
    }

    onmousemove(event){
        this.#x = event.clientX;
        this.#y = event.clientY;
        console.log('Mouse Move', event);
    }

    onmouseout(event){
        this.onmouseup(event);
        console.log('Mouse Out', event);
    }

    onmouseover(event){
        console.log('Mouse Over', event);
    }

    onmouseup(event){
        this.#lftClicked = false;
        this.#rgtClicked = false;
        this.#dbClicked = false;
    }

    getX(){
        return this.#x * SCALE;
    }

    getY(){
        return this.#y * SCALE;
    }

    getLeftClicked(){
        return this.#lftClicked;
    }

    getRightClicked(){
        return this.#rgtClicked;
    }

    getDoubleClicked(){
        return this.#dbClicked;
    }
}
