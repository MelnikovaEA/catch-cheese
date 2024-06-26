import {getGridSettings, movePlayer, subscribe, unsubscribe} from "../../../core/state.js";
import {cellComponent} from "./cell/CellComponent.js";
import {MOVING_DIRECTIONS} from "../../../core/constants.js";

export const gridComponent = () => {

    console.log('GRID CREATED');

    const localState = {cleanupFunctions: []};

    const keyupHandler = (event) => {
        console.log(event.code)
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

    const element = document.createElement('table');
    element.classList.add('grid');

    render(element, localState);

    return {
        element,
        cleanup: () => {
            console.log('Grid makes cleanup');
            localState.cleanupFunctions.forEach(cf => cf());
            document.removeEventListener('keyup', keyupHandler);
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