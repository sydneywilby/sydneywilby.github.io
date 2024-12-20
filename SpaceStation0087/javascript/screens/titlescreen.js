class TitleScreen extends GameScreen {
    #background;
    #buttons;
    constructor(){
       super();

       this.#background = new Image();
       this.#background.crossOrigin = "anonymous";
       this.#background.src = "https://sydneywilby.github.io/SpaceStation0087/resources/images/title.png";
       this.setButtons(
        [new GameButton(width * 0.8,height*0.7,180,20,"PLAY",function(){ STATE = GAMESTATE[GAMESTATE['GAME']]; }),
        new GameButton(width * 0.8,height*0.7 + 30,180,20,"LEVELS",function(){ STATE = GAMESTATE[GAMESTATE['MENU']]; }),
        new GameButton(width * 0.8,height*0.7 + 60,180,20,"SETTINGS",function(){ STATE = GAMESTATE[GAMESTATE['SETTINGS']]; }),
        new GameButton(width * 0.8,height*0.7 + 90,180,20,"CREDITS",function(){ STATE = GAMESTATE[GAMESTATE['CREDITS']]; })]);
    }

    drawScreen(ctx){
        ctx.fillStyle = "rgb(5,4,5)";
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle = "rgba(255, 255, 255, 1)"
        ctx.font = "60px cyber";

        let scale = width *(27/42) * 0.6;
        ctx.drawImage(this.#background,0,0);

        ctx.textAlign = "end";
        const text = "SpaceStation"
        ctx.fillText(text, width, 60);
        ctx.font = "80px cyber";
        ctx.lineWidth = 4;
        ctx.strokeText("0087", width, width,scale,scale * (27/42));
        ctx.fillText("0087", width, 60+80);
    
        this.drawButtons(ctx);

        mouse.draw(ctx);
    }

    updateScreen(){
        this.updateButtons(mouse);

        if(keys && keys[13]){
            STATE = GAMESTATE['MENU'];
        }
    }
}