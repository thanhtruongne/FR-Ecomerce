import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {persiststore,store} from './stores/root'
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './styles/style.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persiststore} >
        <BrowserRouter>  
            <App />
        </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


