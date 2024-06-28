import {getPlayersCount, subscribe, unsubscribe} from "../../../core/state.js";
import {EVENTS} from "../../../core/constants.js";
import {resultCheeseComponent} from "./resultCheeseComponent.js";
import {resultPlayerComponent} from "./resultPlayerComponent.js";

export const resultPanelComponent = () => {

    console.log('POINTS CREATED')
    const element = document.createElement('div');
    element.classList.add('results');

    const observer = (e) => {
        if (e.name === EVENTS.SCORES_CHANGED) render(element)
    }

    subscribe(observer);

    render(element);

    return {element, cleanup: () => unsubscribe(observer)};
}

const render = async (el) => {
    console.log('POINTS RENDER')
    const playersCount = await getPlayersCount();
    el.innerHTML = '';

    el.append(resultCheeseComponent().element);
    for (let i = 1; i <= playersCount; i++) {
        console.log(playersCount)
        el.append(resultPlayerComponent(i).element);
    }
}