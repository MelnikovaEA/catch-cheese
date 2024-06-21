import {appComponent} from "./ui/components/AppComponent.js";
import {subscribe} from "./core/state.js";

const rootElement = document.getElementById('root');

const renderApp = () => {
    rootElement.innerHTML = '';

    const appElement = appComponent();

    rootElement.append(appElement);
}

renderApp();

subscribe(renderApp);