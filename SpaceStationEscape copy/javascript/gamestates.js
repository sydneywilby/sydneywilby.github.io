const GAMESTATE = {};
const GAMESCREEN = {};
let STATE = null;

function defineGameStates(){
    const states = [
        ['GAME-TITLE',new TitleScreen()],
        ['MENU',new TitleScreen()],
        ['LEVEL',new TitleScreen()],
        ['LEVEL-SELECT',new TitleScreen()],
        ['LOADING',new TitleScreen()]
    ];      
    
    for (let index = 0; index < states.length; index++) {
        const state = states[index][0];
        GAMESTATE[GAMESTATE[index] = state] = index;     
        GAMESCREEN[state] = states[index][1];
    }

    STATE = GAMESTATE[0];
}

defineGameStates();

