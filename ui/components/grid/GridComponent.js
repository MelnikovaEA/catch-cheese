import {getGridSettings, movePlayer} from "../../../core/state.js";
import {cellComponent} from "./cell/CellComponent.js";
import {MOVING_DIRECTIONS} from "../../../core/constants.js";

export const gridComponent = () => {

    const localState = {cleanupFunctions: []};

    const keyupHandler = (event) => {
        switch (event.code) {
            case 'ArrowUp': movePlayer(1, MOVING_DIRECTIONS.UP); break;
            case 'ArrowDown': movePlayer(1, MOVING_DIRECTIONS.DOWN); break;
            case 'ArrowRight': movePlayer(1, MOVING_DIRECTIONS.RIGHT); break;
            case 'ArrowLeft': movePlayer(1, MOVING_DIRECTIONS.LEFT); break;
            case 'KeyW': movePlayer(2, MOVING_DIRECTIONS.UP); break;
            case 'KeyS': movePlayer(2, MOVING_DIRECTIONS.DOWN); break;
            case 'KeyD': movePlayer(2, MOVING_DIRECTIONS.RIGHT); break;
            case 'KeyA': movePlayer(2, MOVING_DIRECTIONS.LEFT); break;
        }
    }

    document.addEventListener('keyup', keyupHandler);

    const element = document.createElement('div');
    element.classList.add('grid');

    render(element, localState);

    return {
        element,
        cleanup: () => {
            localState.cleanupFunctions.forEach(cf => cf());
            document.removeEventListener('keyup', keyupHandler);
        }
    };
}

const render = async (el, localState) => {

    localState.cleanupFunctions.forEach(cf => cf());
    localState.cleanupFunctions = [];

    el.innerHTML = '';

    const settings = await getGridSettings();
    const table = document.createElement('table');
    table.classList.add('table');

    for (let x = 0; x < settings.rowsCount; x++) {
        const gridRow = document.createElement('tr');

        for (let y = 0; y < settings.columnCount; y++) {
            const cellElement = cellComponent(x, y);
            localState.cleanupFunctions.push(cellElement.cleanup)
            gridRow.append(cellElement.element);
        }

        table.append(gridRow);
    }

    el.append(table)
}