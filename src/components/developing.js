import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { NavLink } from "react-router-dom";
const Developing = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol
          size-xs="12"
          size-sm="10"
          size-md="8"
          size-lg="6"
          style={{ margin: "0 auto" }}
        >
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>正在开发中......</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              你可以：
              <NavLink to="/contribute">
                <IonButtons>
                  <IonButton color="primary">参与贡献</IonButton>
                </IonButtons>
              </NavLink>
              <IonText> 或点击右下角的对话框提意见</IonText>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Developing;
