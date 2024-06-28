import {start} from "../../../core/state.js";

export const startComponent = () => {
    const element = document.createElement('div');
    element.classList.add('start-component');

    render(element);

    return {element};
}

const render = async (el) => {
    const button = document.createElement('button');
    button.append('START GAME');
    button.addEventListener('click', () => {
        start();
    })

    el.append(button);
}