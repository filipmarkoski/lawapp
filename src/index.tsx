import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Expenses from "./routes/expenses";
import Login from "./routes/login";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="app" element={<App/>}/>
                    <Route path="expenses" element={<Expenses/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
