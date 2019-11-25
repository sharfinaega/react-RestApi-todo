import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

// import "./App.css";
import RestApi from "./components/RestApi";
import AddNewTodos from "./components/AddNewTodos";

export const selectorName = state => state.selector;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/rest-api">
          <RestApi />
        </Route>

        <Route path="/add-new-todos">
          <AddNewTodos />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
