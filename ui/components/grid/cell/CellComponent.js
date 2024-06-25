import {getCheesePosition, getPlayerPosition, subscribe, unsubscribe} from "../../../../core/state.js";
import {cheeseComponent} from "../../common/cheeseComponent.js";
import {playerComponent} from "../../common/playerComponent.js";

export const cellComponent = (x, y) => {

    //console.log(`CELL ${x} ${y} CREATED`);

    const element = document.createElement('td');

    const observer = () => {
        render(element, x, y)
    }

    subscribe(observer);

    render(element, x, y);

    return {
        element, cleanup: () => {
            console.log(`Cleanup for cell ${x}, ${y}`);
            unsubscribe(observer);
        }
    };
}

const render = async (el, x, y) => {
    //console.log(`CELL ${x} ${y} RENDERING`)
    el.innerHTML = '';

    const cheesePosition = await getCheesePosition();
    const player1Position = await getPlayerPosition(1);
    const player2Position = await getPlayerPosition(2);

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