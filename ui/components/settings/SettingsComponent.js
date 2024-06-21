export const settingsComponent = () => {

    const element = document.createElement('div');

    render(element);

    return {element};//возвращается обект со свойством {element(ключ): element(созданный в начале
    // функции div)}, это нужно из-за того, что асинхронная функция render возвращает промис, а ппромис
    // это объект в данном случае со свойством element: element
}

const render = async (el) => {
    el.append('Settings will be here');
}