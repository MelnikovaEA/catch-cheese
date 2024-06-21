export const playerComponent = (playerNumber) => {
    const element = document.createElement('img');
    element.classList.add('grid-img');

    render(element, playerNumber);

    return {element};
}

const render = async (el, number) => {
    el.src = `ui/assets/images/player-${number}.png`;
}