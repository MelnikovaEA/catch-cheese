import {getPlayerPoints, subscribe, unsubscribe} from "../../../core/state.js";
import { EVENTS} from "../../../core/constants.js";

export const resultPlayerComponent = (playerNumber) => {

    const element = document.createElement('div');
    element.classList.add('result-field');

    const observer = (e) => {
        if (e.name === EVENTS.SCORES_CHANGED) render(element, playerNumber)
    }

    subscribe(observer);

    render(element, playerNumber);

    return {element, cleanup: () => unsubscribe(observer)};
}

const render = async (el, playerNumber) => {

    el.innerHTML = '';
    const playerPoints = await getPlayerPoints(playerNumber);

    const title = document.createElement('span');
    title.innerText = `Player ${playerNumber}:`;

    const points = document.createElement('span');
    points.innerHTML = playerPoints;

    const img = document.createElement('img');
    img.src = `ui/assets/images/player-${playerNumber}.png`;

    el.append(title, points, img);
}