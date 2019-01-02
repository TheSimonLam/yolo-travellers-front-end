import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './store';

import fetch from 'node-fetch'
global.fetch = global.fetch || fetch

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
