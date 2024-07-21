class TitleScreen extends GameScreen {
    #background;
    constructor(){
       super();

       this.#background = new Image();
       this.#background.crossOrigin = "anonymous";
       this.#background.src = "";

    }

    drawScreen(ctx){
        ctx.fillStyle = "rgba(120, 20, 10, 1)"
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle = "rgba(255, 255, 255, 1)"
        ctx.font = "80px Arial";
        ctx.textAlign = "center";
        ctx.strokeText("SpaceStation", width/2, height/2);
    }

    updateScreen(){
        
    }
}