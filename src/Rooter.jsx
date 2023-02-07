import React from "react";
import {Router, Link, Switch, Route} from "react-router-dom";
import history from "./history";
import {TestCrud} from "./Test/TestCrud"; 


export const Rooter = () => {
    return (
        <Router history={history}>
        <div>
          <ul>
            <li>
              <Link to="/">Create</Link>
            </li>
            <li>
                <Link to="/formEdit">Edit</Link>
            </li>
          </ul>
  
          <hr />
  
          <Switch>
            <Route exact path="/">
              <TestCrud/>
            </Route>
            <Route exact path="/formEdit">
              <TestCrud edit={true}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
};