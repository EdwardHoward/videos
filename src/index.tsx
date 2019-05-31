import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Player } from './react/Player';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route path="/:subreddit" component={Player} />
  </Router>, document.getElementById('root'));