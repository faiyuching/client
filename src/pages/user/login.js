import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import React, { useState,useContext } from "react";
import { Contexts } from "../../util/contexts";
import { NavLink } from "react-router-dom";
import { login } from "../../controllers/user";
import Header from "../../components/header";
const Login = () => {
  const auth = useContext(Contexts);
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = () => {
    const data = new FormData();
    data.append("telephone", telephone);
    data.append("password", password);
    login(data).then((res) => {
      if (res.status === "success") {
        localStorage.setItem("token", res.token);
        window.location.href = "/forum";
      }
      if (res.status === "fail") {
        alert(res.message);
      }
    });
  };

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader hidden={auth.screenSize==="md" || auth.screenSize==="lg"}>
          <IonToolbar>
            <IonTitle>登录</IonTitle>
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
                <IonCardHeader>
                  <IonCardSubtitle>卓明</IonCardSubtitle>
                  <IonCardTitle>登录</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">手机号</IonLabel>
                    <IonInput
                      type="text"
                      name="telephone"
                      onIonChange={(e) => {
                        setTelephone(e.detail.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">密码</IonLabel>
                    <IonInput
                      type="password"
                      name="password"
                      onIonChange={(e) => {
                        setPassword(e.detail.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <br />
                  <IonButton onClick={onSubmit}>登录</IonButton>
                  <NavLink to={"/register"}>
                    <IonButton fill="clear">注册 →</IonButton>
                  </NavLink>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
