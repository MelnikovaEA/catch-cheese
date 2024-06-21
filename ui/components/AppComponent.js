import {resultPanelComponent} from "./resultPanel/ResultPanelComponent.js";
import {gridComponent} from "./grid/GridComponent.js";
import {settingsComponent} from "./settings/SettingsComponent.js";

export const appComponent = () => {
    const element = document.createElement('div');

    render(element);

    return element;
}

const render = async (el) => {
    const settingsElement = settingsComponent();
    const pointsElement = resultPanelComponent();
    const gridElement = gridComponent();

    el.append(settingsElement.element, pointsElement.element, gridElement.element);
}
