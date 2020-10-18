import { IonCard, IonList, IonItem, IonText } from "@ionic/react";
import React from "react";

const UserItem = (props) => {
  const user = props.user;
  return (
    <IonCard>
      <IonList>
        <IonItem lines="none">
          <IonText color="medium">城市：</IonText>
          <IonText>{user.city}</IonText>
        </IonItem>
        <IonItem lines="none">
          <IonText color="medium">领域：</IonText>
          <IonText>{user.field}</IonText>
        </IonItem>
        <IonItem lines="none">
          <IonText color="medium">擅长：</IonText>
          <IonText>{user.skill}</IonText>
        </IonItem>
      </IonList>
    </IonCard>
  );
};

export default UserItem;
