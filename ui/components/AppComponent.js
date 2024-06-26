import {resultPanelComponent} from "./resultPanel/ResultPanelComponent.js";
import {gridComponent} from "./grid/GridComponent.js";
import {settingsComponent} from "./settings/SettingsComponent.js";
import {getGameStatus, subscribe} from "../../core/state.js";
import {startComponent} from "./startComponent/startComponent.js";
import {looseComponent} from "./loose/looseComponent.js";
import {winComponent} from "./win/winComponent.js";
import {GAME_STATUSES} from "../../core/constants.js";
import {audioComponent} from "../audio/audioComponent.js";

export const appComponent = () => {
    console.log('APP CREATED');
    let localState = {prevState: null, cleanupFunctions: []}

    const element = document.createElement('div');

    const audio = audioComponent();


    render(element, localState);

    subscribe(() => {
        render(element, localState);
    })

    return element;
}

const render = async (el, localState) => {

    const gameStatus = await getGameStatus();

    if (localState.prevState === gameStatus) return;

    localState.prevState = gameStatus;
    console.log('APP RENDERING');

    localState.cleanupFunctions.forEach(cf => cf());
    localState.cleanupFunctions = [];

    el.innerHTML = '';

    switch (gameStatus) {
        case GAME_STATUSES.SETTINGS: {
            const settingsElement = settingsComponent();
            const startElement = startComponent();

            el.append(settingsElement.element, startElement.element);

            break
        }
        case GAME_STATUSES.IN_PROGRESS: {
            const settingsElement = settingsComponent();
            const pointsElement = resultPanelComponent();
            localState.cleanupFunctions.push(pointsElement.cleanup);
            const gridElement = gridComponent();
            localState.cleanupFunctions.push(gridElement.cleanup);

            el.append(settingsElement.element, pointsElement.element, gridElement.element);

            break
        }
        case GAME_STATUSES.WIN: {
            const winElement = winComponent();
            el.append(winElement.element);

            break
        }
        case GAME_STATUSES.LOOSE: {
            const looseElement = looseComponent();
            el.append(looseElement.element);

            break
        }
        default:
            throw new Error('RENDERING ERROR')
    }
}
