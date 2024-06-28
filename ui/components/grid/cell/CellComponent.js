import {getCheesePosition, getPlayerPosition, subscribe, unsubscribe} from "../../../../core/state.js";
import {cheeseComponent} from "../../common/cheeseComponent.js";
import {playerComponent} from "../../common/playerComponent.js";
import {EVENTS} from "../../../../core/constants.js";

export const cellComponent = (x, y) => {

    const localState = {renderingVersion: 0};

    const element = document.createElement('td');

    const observer = (e) => {
        if(e.name !== EVENTS.CHEESE_JUMPED && e.name !== EVENTS.PLAYER1_MOVED && e.name !== EVENTS.PLAYER2_MOVED) return;

        if(e.payload.prevPosition.x === x && e.payload.prevPosition.y === y){
            render(element, x, y, localState);
        }

        if(e.payload.position.x === x && e.payload.position.y === y){
            render(element, x, y, localState);
        }
    }

    subscribe(observer);

    render(element, x, y, localState);

    return {
        element, cleanup: () => {
            unsubscribe(observer);
        }
    };
}

const render = async (el, x, y, localState) => {
    localState.renderingVersion++;
    const currentRenderingVersion = localState.renderingVersion;

    el.innerHTML = '';

    const cheesePosition = await getCheesePosition();
    const player1Position = await getPlayerPosition(1);
    const player2Position = await getPlayerPosition(2);

    if(currentRenderingVersion < localState.renderingVersion) return;

    if (x === cheesePosition.x && y === cheesePosition.y) {
        el.append(cheeseComponent().element);
    }

    if (x === player1Position.x && y === player1Position.y) {
        el.append(playerComponent(1).element);
    }

    if (x === player2Position.x && y === player2Position.y) {
        el.append(playerComponent(2).element);
    }
}