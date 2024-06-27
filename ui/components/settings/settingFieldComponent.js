import {subscribe, unsubscribe} from "../../../core/state";

export const settingFieldComponent = () => {
    console.log('setting element creating')

    const element = document.createElement('div');
    element.classList.add('settings-component__item_field')

    render(element);

    return {
        element, cleanup: () => {
        }
    };

}

const render = async (el) => {
    console.log('setting field rendering')
    const field = document.createElement('div');
    return field;

}