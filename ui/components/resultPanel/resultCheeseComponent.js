import {getCheesePoints, subscribe, unsubscribe} from "../../../core/state.js";
import {EVENTS} from "../../../core/constants.js";

export const resultCheeseComponent = () => {

    const element = document.createElement('div');
    element.classList.add('result-field');

    const observer = (e) => {
        if (e.name === EVENTS.SCORES_CHANGED) render(element)
    }

    subscribe(observer);

    render(element);

    return {element, cleanup: () => unsubscribe(observer)};
}

const render = async (el) => {
    el.innerHTML = '';

    const cheesePoints = await getCheesePoints();

    const title = document.createElement('span');
    title.innerText = 'Cheese:';

    const points = document.createElement('span');
    points.innerHTML = cheesePoints;

    const img = document.createElement('img');
    img.src = 'ui/assets/images/cheese.png';

    el.append(title, points, img);
}