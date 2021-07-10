import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Inicio from "../containers/Posts/Posts";
import EditPost from "../containers/Posts/EditPost";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/editar/:id" component={EditPost} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
