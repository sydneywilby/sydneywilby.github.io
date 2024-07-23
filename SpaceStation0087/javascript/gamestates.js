const GAMESTATE = {};
const GAMESCREEN = {};
const LOADINGSCREEN = new LoadingScreen();
let STATE = null;

function defineGameStates(){
    const states = [
        ['TITLE',new TitleScreen()],
        ['MENU',new MenuScreen()],
        ['LEVEL',new TitleScreen()],
        ['LEVEL-SELECT',new TitleScreen()],
        ['LOADING',new LoadingScreen()]
    ];      
    
    for (let index = 0; index < states.length; index++) {
        const state = states[index][0];
        GAMESTATE[state] = index;     
        GAMESCREEN[state] = states[index][1];
        GAMESCREEN[index] = states[index][1];
    }

    STATE = GAMESTATE['TITLE'];
}

defineGameStates();

