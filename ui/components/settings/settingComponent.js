import {
    getGridSettings, getPointsToLoose,
    getPointsToWin,
    setSettings,
    subscribe,
    unsubscribe
} from "../../../core/state.js";
import {EVENTS} from "../../../core/constants.js";

export const settingComponent = (settings) => {

    const element = document.createElement('div');
    element.classList.add('setting-component')

    const observer = (e) => {
        if(e.name === EVENTS.SETTING_CHANGED || e.name === EVENTS.GAME_STARTED) render(element, settings);
    }

    subscribe(observer)

    render(element, settings);

    return {element, cleanup: () => {
            unsubscribe(observer)
        }
    };

}

const render = async (el, settings) => {

    el.innerHTML = '';

    const title = document.createElement('p');
    title.innerText = settings.title;
    el.append(title);

    const button = document.createElement('button');
    button.classList.add('setting-component__button');
    const buttonText = async () => {
        if(settings.title === 'Grid options'){
            const data = await getGridSettings();
            return `${data.rowsCount} x ${data.columnCount}`
        }
        if(settings.title === 'Points to win'){
            return await getPointsToWin();
        }
        if(settings.title === 'Points to loose'){
            return await getPointsToLoose();
        }
    }
    button.textContent = await buttonText();
    el.append(button);

    const list = document.createElement('div');
    list.classList.add('setting-component__list');

    button.addEventListener('click', () => {
        list.classList.toggle('show');
    });

    settings.options.forEach(arg => {
        const field = document.createElement('div');
        field.classList.add('setting-component__field');
        field.setAttribute('data-value', arg);
        field.innerText = arg;

        field.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            button.textContent = e.target.textContent;
            setSettings(settings.title, value);
            list.classList.remove('show');
            console.log(`Selected value: ${value}`);
        });

        list.append(field);
    })

    el.append(list);
}