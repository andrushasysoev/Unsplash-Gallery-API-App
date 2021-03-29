import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import {BrowserRouter, Route} from "react-router-dom";

import Auth from "./api/Auth";
import ImagesList from "./components/images";
import ImageGet from "./components/img";

import './css/style.css';

localStorage.setItem("page", 1);
localStorage.setItem("perPage", 10);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={Auth} />
      <Route exact path="/photos" component={ImagesList} />
      <Route path="/photos/:id" component={ImageGet} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
