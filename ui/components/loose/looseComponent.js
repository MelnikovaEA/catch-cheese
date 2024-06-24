import {playAgain} from "../../../core/state.js";

export const looseComponent = () => {
    const element = document.createElement('div');
    element.classList.add('loose-component');

    render(element);

    return {element};
}

const render = async (el) => {
    const message = document.createElement('h1');
    message.append('YOU LOOSE');

    const button = document.createElement('button');
    button.append('PLAY AGAIN');
    button.addEventListener('click', () => {
        playAgain();
    })

    el.append(message, button);
}