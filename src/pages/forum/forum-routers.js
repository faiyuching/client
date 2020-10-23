
import React from "react";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import ForumMenu from "../../components/forum/forum-menu";
import Forum from "./forum";

const ForumRouters = () => {
  return (
    <IonReactRouter>
      <ForumMenu />
      <IonRouterOutlet id="main">
        <Route path="/forum" component={Forum} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default ForumRouters;
