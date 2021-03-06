import React from 'react';
import ReactDOM from 'react-dom';
import Root from './ui/Root';import './index.css';

//import * as serviceWorker from './serviceWorker';
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import {Provider} from "react-redux";
import store from "./store/store";

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
}

const theme = createTheme();

ReactDOM.render(<ThemeProvider theme={theme}><Provider store={store}><Root/></Provider></ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
