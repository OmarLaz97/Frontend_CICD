import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./Containers/MainPage/MainPage"

import 'antd/dist/antd.css';
import './App.css';


function App() {
  return (
    <React.Fragment>
        <Route>
            <Switch>
                <Route path="/" exact component={MainPage} />
            </Switch>
        </Route>
    </React.Fragment>
  );
}

export default App;
