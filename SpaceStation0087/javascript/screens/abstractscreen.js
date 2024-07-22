class GameScreen {

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

}