import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonPage,
} from "@ionic/react";
import React, { useContext } from "react";
import { AuthContext } from "../util/auth-context";
import Developing from "../components/developing";
import Header from "../components/header";

const Response = () => {
  const auth = useContext(AuthContext);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader hidden={auth.screenSize==="md" || auth.screenSize==="lg"}>
          <IonToolbar>
            <IonTitle>响应</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <Developing />
      </IonContent>
    </IonPage>
  );
};

export default Response;
