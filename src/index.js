import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./components/App";
import { Provider } from 'react-redux';

import { store } from './helpers';
import registerServiceWorker from './registerServiceWorker';

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
