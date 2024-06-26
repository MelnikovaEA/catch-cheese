import {subscribe} from "../../core/state.js";
import {EVENTS} from "../../core/constants.js";

export const audioComponent = () => {

    const moveAudio = new Audio('ui/assets/sounds/move.mp3');
    const caughtAudio = new Audio('ui/assets/sounds/catch.mp3');

    subscribe((e) => {
        if(e.name === EVENTS.CHEESE_CAUGHT){
            caughtAudio.currentTime = 0;
            caughtAudio.play();
        }
        if(e.name === EVENTS.PLAYER1_MOVED || e.status === EVENTS.PLAYER2_MOVED){
            moveAudio.currentTime = 0;
            moveAudio.play();
        }
    })

}