import {getCheesePoints, getPlayerPoints} from "../../../core/state.js";

export const resultPanelComponent = () => {
    const element = document.createElement('div');
    element.classList.add('results');

    render(element);

    return {element};
}

const render = async (el) => {
    const cheesePoints = await getCheesePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    el.append(`Cheese: ${cheesePoints}, Player 1: ${player1Points}, Player 2: ${player2Points}`);
}