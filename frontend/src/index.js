import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./components/App";
import Router from "./components/Router";
//import reportWebVitals from './reportWebVitals';
import store from "./store";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

//ReactDOM.render(<App />, document.querySelector("#root"));

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>
// );

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
