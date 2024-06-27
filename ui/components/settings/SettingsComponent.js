import {settingComponent} from "./settingComponent.js";
import {gameOptions} from "../../../core/gameOptions.js";

export const settingsComponent = () => {

    const element = document.createElement('div');
    element.classList.add('settings-component');

    render(element);

    return {element,
        cleanup: () => { }
    };
}

const render = async (el) => {
    el.innerHTML = '';

    const gridSizeSettingsElement = await settingComponent(gameOptions.gridOptions);
    const pointsToWinSettingsElement = await settingComponent(gameOptions.pointsToWinOptions);
    const pointsToLooseSettingsElement = await settingComponent(gameOptions.pointsToLooseOptions);

    el.append(gridSizeSettingsElement.element, pointsToWinSettingsElement.element, pointsToLooseSettingsElement.element);
console.log(el.innerHTML)
}