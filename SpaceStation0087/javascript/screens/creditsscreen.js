class CreditsScreen extends GameScreen{

    constructor(){
        super()
    }

    drawScreen(ctx){
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgb(56,210,10)"
        ctx.fillText("credits",width/2,height/2);
    
    }

    updateScreen(){
    
    }
}