import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CurrentPage from "./pages/CurrentPage";
import SelectPage from "./pages/SelectPage";
import AboutMePage from "./pages/AboutMePage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={["/", "/current"]}>
          <CurrentPage />
        </Route>
        <Route exact path="/history/select">
          <SelectPage />
        </Route>
        <Route path="/history/result">
          <ResultPage />
        </Route>
        <Route exact path="/about">
          <AboutMePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
