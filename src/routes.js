import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import App from "./App";
import Dashboard from "./features/Dashboard";
import ConceptListContainer from "./features/Play/ConceptListContainer";
import CreateAndUpdateLesson from "./features/CreateAndUpdateLesson";
import GiphySearcher from "./features/CreateAndUpdateLesson/GiphySearcher";

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
        <Switch>
          <Route exact path="/" component={GiphySearcher} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/lessons/new" component={CreateAndUpdateLesson} />
          <Route
            path="/lessons/:lessonId/edit"
            component={CreateAndUpdateLesson}
          />
          <Route path="/lessons/:lessonId" component={ConceptListContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
