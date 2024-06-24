import {getGridSettings, subscribe, unsubscribe} from "../../../core/state.js";
import {cellComponent} from "./cell/CellComponent.js";

export const gridComponent = () => {

    console.log('GRID CREATED')

    const element = document.createElement('table');
    element.classList.add('grid');

    const observer = () => {
        render(element)
    }

    subscribe(observer);

    render(element);

    return {element, cleanup: () => {
        console.log('GRID CLEANUP CALLED')
        unsubscribe(observer)
    }};
}

const render = async (el) => {

    console.log('GRID RENDER');

    el.innerHTML = '';

    const settings = await getGridSettings();

    for (let x = 0; x < settings.rowsCount; x++) {
        const gridRow = document.createElement('tr');

        for (let y = 0; y < settings.columnCount; y++) {
            const cellElement = cellComponent(x, y);
            gridRow.append(cellElement.element);
        }

        el.append(gridRow);
    }
}