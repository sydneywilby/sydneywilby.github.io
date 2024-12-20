class MenuScreen extends GameScreen{

    constructor(){
        super();
    }

    drawScreen(ctx){
        ctx.textAlign = 'center';
        ctx.fillStyle = "rgb(56,210,10)"
        ctx.fillText("menu",width/2,height/2);
    
        if (mouse.getLeftClicked()) {
            ctx.fillStyle = "rgb(210,40,76)"
        }else{
            ctx.fillStyle = "rgb(21,240,76)"
        }
        
        mouse.draw(ctx);
    }

    updateScreen(){
 
    }

}