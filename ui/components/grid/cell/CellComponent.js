import {getCheesePosition, getPlayerPosition} from "../../../../core/state.js";
import {cheeseComponent} from "../../common/cheeseComponent.js";
import {playerComponent} from "../../common/playerComponent.js";

export const cellComponent = (x, y) => {
    const element = document.createElement('td');

    render(element, x, y);

    return {element};
}

const render = async (el, x, y) => {
    const cheesePosition = await getCheesePosition();
    const player1Position = await getPlayerPosition(1);
    const player2Position = await getPlayerPosition(2);

    if(x === cheesePosition.x && y === cheesePosition.y) {
        el.append(cheeseComponent().element);
    }

    if(x === player1Position.x && y === player1Position.y) {
        el.append(playerComponent(1).element);
    }

    if(x === player2Position.x && y === player2Position.y) {
        el.append(playerComponent(2).element);
    }


}