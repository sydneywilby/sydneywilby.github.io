class GameScreen {
    #loading = false;
    #buttons = [];

    constructor(){
        if(this.constructor === GameScreen){
            throw new Error('You can create an instance for Abstract Class.')
        }
    }

    drawScreen(ctx){
        throw new Error('Function not implemented')
    }

    updateScreen(){
        throw new Error('Function not implemented')
    }

    getLoading(){
        return this.#loading;
    }

    setLoading(loading){
        this.#loading = loading;
    }

    setButtons(buttons){
        this.#buttons = buttons;
    }

    updateButtons(mouse){
        const len = this.#buttons.length
        for (let index = 0; index < len; index++) {
            const button = this.#buttons[index];
            button.update(mouse);
        }
    }

    drawButtons(ctx){
        const len = this.#buttons.length
        for (let index = 0; index < len; index++) {
            const button = this.#buttons[index];
            button.draw(ctx);
        }
    }


}