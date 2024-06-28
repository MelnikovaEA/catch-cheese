import {playAgain} from "../../../core/state.js";

export const looseComponent = () => {
    const element = document.createElement('div');
    element.classList.add('loose-component');

    render(element);

    return {element};
}

const render = async (el) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('looseWinMessage-wrapper');

    const message = document.createElement('h1');
    message.append('CHEESE WIN! YOU LOOSE!');

    wrapper.append(message);

    const button = document.createElement('button');
    button.append('PLAY AGAIN');
    button.addEventListener('click', () => {
        playAgain();
    })

    wrapper.append(button);

    el.append(wrapper);
}