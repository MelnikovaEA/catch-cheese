import {getGridSettings} from "../../../core/state.js";
import {cellComponent} from "./cell/CellComponent.js";

export const gridComponent = () => {

    const element = document.createElement('table');
    element.classList.add('grid');

    createGrid(element);

    return {element};
}

const createGrid = async (el) => {

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