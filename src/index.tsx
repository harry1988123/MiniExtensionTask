import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './features/app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import './styles.css';
import '../node_modules/bootstrap';
import '../node_modules/bootstrap/js/dist/dropdown';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
); 
serviceWorker.unregister();
