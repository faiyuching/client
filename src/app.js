import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  bulbOutline,
  earthOutline,
  documentTextOutline,
  chatbubblesOutline,
} from "ionicons/icons";

import { AuthContext } from "./util/auth-context";
import jwtDecode from "jwt-decode";
import DeviceDetector from "device-detector-js";

import Home from "./pages/home";
import Forecast from "./pages/forecast";
import Response from "./pages/response";
import Product from "./pages/product";
import Forum from "./pages/forum/forum";
import Question from "./pages/forum/question";
import QuestionNew from "./pages/forum/question-new";
import QuestionUpdate from "./pages/forum/question-update";
import TopicNew from "./pages/forum/topic-new";
import TopicUpdate from "./pages/forum/topic-update";
import Contribute from "./pages/contribute/contribute";

import User from "./pages/user/user";
import UserUpdate from "./pages/user/user-update";
import Login from "./pages/user/login";
import Register from "./pages/user/register";

import getScreenSize from "./controllers/screen-size";
import ForumRouter from "./pages/forum/forum-routers";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

function App() {
  const auth = useContext(AuthContext);
  auth.screenSize = getScreenSize(document.documentElement.clientWidth);
  auth.language = navigator.language;
  const deviceDetector = new DeviceDetector();
  auth.device = deviceDetector.parse(navigator.userAgent).os.name;

  if (localStorage.token) {
    const jwt = jwtDecode(localStorage.token);
    if (jwt.exp * 1000 > Date.now()) {
      auth.isLoggedIn = true;
      auth.user = jwt;
    } else {
      localStorage.removeItem("token");
      auth.isLoggedIn = false;
    }
  }

  let routes;

  if (auth.isLoggedIn) {
    routes = (
      <>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/user" component={User} exact={true} />
        <Route path="/user/:id" component={User} exact={true} />
        <Route path="/forecast" component={Forecast} exact={true} />
        <Route path="/response" component={Response} exact={true} />
        <Route path="/product" component={Product} exact={true} />
        <Route path="/forum" component={ForumRouter} exact={true} />
        <Route path="/contribute" component={Contribute} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/question/:id" component={Question} exact={true} />
        <Route path="/new/topic" component={TopicNew} exact={true} />
        <Route path="/update/topic/:id" component={TopicUpdate} exact={true} />
        <Route path="/new/question" component={QuestionNew} exact={true} />
        <Route
          path="/update/question/:id"
          component={QuestionUpdate}
          exact={true}
        />
        <Route path="/update/user/:id" component={UserUpdate} exact={true} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/user" component={User} exact={true} />
        <Route path="/user/:id" component={User} exact={true} />
        <Route path="/forecast" component={Forecast} exact={true} />
        <Route path="/response" component={Response} exact={true} />
        <Route path="/product" component={Product} exact={true} />
        <Route path="/forum" component={Forum} exact={true} />
        <Route path="/contribute" component={Contribute} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/question/:id" component={Question} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Redirect to="/login" />
      </>
    );
  }
  let screen;
  if (auth.screenSize === "xs" || auth.screenSize === "sm") {
    screen = (
      <IonTabs>
        <IonRouterOutlet>{routes}</IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="forecast" href="/forecast">
            <IonIcon icon={bulbOutline} size="small" />
            <IonLabel>预测</IonLabel>
          </IonTabButton>
          <IonTabButton tab="response" href="/response">
            <IonIcon icon={earthOutline} size="small" />
            <IonLabel>响应</IonLabel>
          </IonTabButton>
          <IonTabButton tab="product" href="/product">
            <IonIcon icon={documentTextOutline} size="small" />
            <IonLabel>产品</IonLabel>
          </IonTabButton>
          <IonTabButton tab="forum" href="/forum">
            <IonIcon icon={chatbubblesOutline} size="small" />
            <IonLabel>论坛</IonLabel>
          </IonTabButton>
          <IonTabButton tab="home" href="/user">
            <IonIcon icon={homeOutline} size="small" />
            <IonLabel>我的</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  } else if (auth.screenSize === "md" || auth.screenSize === "lg") {
    screen = <IonRouterOutlet>{routes}</IonRouterOutlet>;
  }

  return (
    <IonApp>
      <AuthContext.Provider
        value={{
          isLoggedIn: auth.isLoggedIn,
          user: auth.user,
          screenSize: auth.screenSize,
          device: auth.device,
          language: auth.language,
        }}
      >
        <IonReactRouter>{screen}</IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
}

export default App;
