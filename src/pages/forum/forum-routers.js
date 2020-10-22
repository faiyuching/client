
import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect,Route } from "react-router-dom";
import Menu from "../../components/menu";
import Forum from "./forum";

const ForumRouters = () => {
  return (
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet id="main">
        <Route path="/forum" component={Forum} exact />
        {/* <Route path="/forum/:topic" component={Forum} exact />
        <Redirect to="/forum" /> */}
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default ForumRouters;
