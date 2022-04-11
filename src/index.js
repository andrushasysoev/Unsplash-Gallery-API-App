import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import {BrowserRouter, Route} from "react-router-dom";

import { authenticate } from './api/unsplash.js';

//список фото
import ImagesList from "./components/images";

//компонент детальной информации о фото
import ImageGet from "./components/img";

import './css/style.css';

localStorage.setItem("page", 1);
localStorage.setItem("perPage", 10);

authenticate();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" />
      <Route exact path="/photos" component={ImagesList} />
      <Route path="/photos/:id" component={ImageGet} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);