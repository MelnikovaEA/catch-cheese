import {getWinner, playAgain} from "../../../core/state.js";

export const winComponent = () => {
    const element = document.createElement('div');
    element.classList.add('win-component');

    render(element);

    return {element};
}

const render = async (el) => {
    const winner = await getWinner();

    const wrapper = document.createElement('div');
    wrapper.classList.add('looseWinMessage-wrapper');

    const message = document.createElement('h1');
    message.append(`PLAYER ${winner} WIN!`);

    wrapper.append(message);

    const button = document.createElement('button');
    button.append('PLAY AGAIN');
    button.addEventListener('click', () => {
        playAgain();
    })

    wrapper.append(button);

    el.append(wrapper);
}