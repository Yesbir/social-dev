import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import _ from "lodash";

import App from "./App.jsx";
import reducers from "./reducers";
import { getCurrentUser } from "./actions/authAction";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));
if (!_.isEmpty(localStorage.jwtToken)) {
  console.log("this is what ");
  const token = localStorage.jwtToken;
  store.dispatch(getCurrentUser(token));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.querySelector("#root")
);
