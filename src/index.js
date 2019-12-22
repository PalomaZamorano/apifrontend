import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { AutoSizer } from "react-virtualized";
ReactDOM.render(
    <BrowserRouter>
    <App/>
  </BrowserRouter>,
document.getElementById('root')
);


