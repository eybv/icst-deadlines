import React from 'react';
import thunk from "redux-thunk";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

import {firebaseConfig} from "./firebase-config";
import {reducer} from "./store/reducer";
import App from './App';
import './index.css';

import firebase from "firebase/app";
import "firebase/analytics";

firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#37b34a',
        },
    },
});

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
));

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </ThemeProvider>,
  document.getElementById('root')
);
