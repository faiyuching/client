import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import React, { useContext } from "react";
import { Contexts } from "../../util/contexts";
import Developing from "../../components/developing";
import Header from "../../components/header";

const Contribute = () => {
  const auth = useContext(Contexts);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader
          hidden={auth.screenSize === "lg"}
        >
          <IonToolbar>
            <IonTitle>参与贡献</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Developing />
      </IonContent>
    </IonPage>
  );
};

export default Contribute;
