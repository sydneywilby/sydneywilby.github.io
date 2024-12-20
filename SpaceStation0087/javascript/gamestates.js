const GAMESTATE = {};
const GAMESCREEN = {};
const LOADINGSCREEN = new LoadingScreen();
let STATE = null;

function defineGameStates(){
    const states = [
        ['TITLE',new TitleScreen()],
        ['MENU',new MenuScreen()],
        ['GAME',new LevelScreen()],
        ['SETTINGS',new SettingsScreen()],
        ['CREDITS',new CreditsScreen()],
        ['LOADING',LOADINGSCREEN]
    ];      
    
    for (let index = 0; index < states.length; index++) {
        const state = states[index][0];
        GAMESTATE[index] = index;  
        GAMESTATE[state] = index;    
        GAMESCREEN[index] = states[index][1];
    }

    STATE = 0;
}

defineGameStates();

