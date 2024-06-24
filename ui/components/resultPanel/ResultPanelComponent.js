import {getCheesePoints, getPlayerPoints, subscribe, unsubscribe} from "../../../core/state.js";

export const resultPanelComponent = () => {

    console.log('POINTS CREATED')
    const element = document.createElement('div');
    element.classList.add('results');

    const observer = () => {
        render(element)
    }

    subscribe(observer);

    render(element);

    return {element, cleanup: () => unsubscribe(observer)};
}

const render = async (el) => {
    console.log('POINTS RENDER')
    el.innerHTML = '';

    const cheesePoints = await getCheesePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    el.append(`Cheese: ${cheesePoints}, Player 1: ${player1Points}, Player 2: ${player2Points}`);
}