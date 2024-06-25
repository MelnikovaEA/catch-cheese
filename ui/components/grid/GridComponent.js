import {getGridSettings, subscribe, unsubscribe} from "../../../core/state.js";
import {cellComponent} from "./cell/CellComponent.js";

export const gridComponent = () => {

    console.log('GRID CREATED');

    const localState = {cleanupFunctions: []}

    const element = document.createElement('table');
    element.classList.add('grid');

    render(element, localState);

    return {
        element,
        cleanup: () => {
            console.log('Grid makes cleanup');
            localState.cleanupFunctions.forEach(cf => cf());
        }
    };
}

const render = async (el, localState) => {

    console.log('GRID RENDER');
    localState.cleanupFunctions.forEach(cf => cf());
    localState.cleanupFunctions = [];

    el.innerHTML = '';

    const settings = await getGridSettings();

    for (let x = 0; x < settings.rowsCount; x++) {
        const gridRow = document.createElement('tr');

        for (let y = 0; y < settings.columnCount; y++) {
            const cellElement = cellComponent(x, y);
            localState.cleanupFunctions.push(cellElement.cleanup)
            gridRow.append(cellElement.element);
        }

        el.append(gridRow);
    }
}