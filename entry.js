import React from "react";
import { render } from "react-dom";
import dva, { connect } from "dva";
import { Router, Route } from "dva/router";
import _ from "lodash";

import * as modelList from "store/modelList";

import App from "component/App/index";

/**
 * Reset css
 */
import "style/reset.css";
/**
 * Root css
 */
import "style/root.css";

const app = dva();

// bind model
_.mapValues(modelList, app.model);

app.router(({ history }) => (
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
));

app.start("#root");
