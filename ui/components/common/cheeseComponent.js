export const cheeseComponent = () => {
    const element = document.createElement('img');
    element.classList.add('grid-img');

    render(element);

    return {element};
}

const render = async (el) => {
    el.src = 'ui/assets/images/cheese.png';
}