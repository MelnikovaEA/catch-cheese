import {appComponent} from "./ui/components/AppComponent.js";

const rootElement = document.getElementById('root');

rootElement.innerHTML = '';

const appElement = appComponent();

rootElement.append(appElement);

