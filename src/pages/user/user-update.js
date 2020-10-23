import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import { Contexts } from "../../util/contexts";
import { useParams } from "react-router-dom";
import { findUserById } from "../../controllers/user";
import UserUpdatePicture from "../../components/user/user-update-picture";
import UserUpdateAvatar from "../../components/user/user-update-avatar";
import UserUpdateUsername from "../../components/user/user-update-username";
import UserUpdateTelephone from "../../components/user/user-update-telephone";
import UserUpdatePassword from "../../components/user/user-update-password";
import UserUpdateInfo from "../../components/user/user-update-info";
import Header from "../../components/header";
const UserUpdate = () => {
  const auth = useContext(Contexts);
  const id = useParams().id;
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    telephone: "",
    password: "",
    introduction: "",
    city: "",
    field: "",
    skill: "",
  });
  useEffect(() => {
    findUserById(id).then((data) => {
      setUser(data);
    });
  }, [id]);

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader hidden={auth.screenSize === "lg"}>
          <IonToolbar>
            <IonTitle>编辑资料</IonTitle>
          </IonToolbar>
        </IonHeader>
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
                <UserUpdatePicture id={id} picture={user.picture} />
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size-xs="12" size-sm="12" size-md="2" size-lg="2">
                        <UserUpdateAvatar id={id} avatar={user.avatar} />
                      </IonCol>
                      <IonCol size="12" size-sm="12" size-md="10" size-lg="10">
                        <UserUpdateUsername id={id} username={user.username} />
                        <UserUpdateTelephone
                          id={id}
                          telephone={user.telephone}
                        />
                        <UserUpdatePassword id={id} password={user.password} />
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
              <UserUpdateInfo
                id={id}
                introduction={user.introduction}
                city={user.city}
                field={user.field}
                skill={user.skill}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserUpdate;
