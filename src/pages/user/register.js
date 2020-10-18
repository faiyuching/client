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
import { AuthContext } from "../../util/auth-context";
import { NavLink } from "react-router-dom";
import { createUser } from "../../controllers/user";
import Header from "../../components/header";
const Register = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(null);

  const onSubmit = () => {
    if (password === passwordCheck) {
      const data = new FormData();
      data.append("username", username);
      data.append("telephone", telephone);
      data.append("password", password);
      createUser(data).then((res) => {
        if (res.status === "success") {
          window.location.href = "/login";
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    } else {
      alert("两次输入的密码不相符");
    }
  };
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader hidden={auth.screenSize==="md" || auth.screenSize==="lg"}>
          <IonToolbar>
            <IonTitle>注册</IonTitle>
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
                  <IonCardTitle>注册</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">用户名</IonLabel>
                    <IonInput
                      type="text"
                      name="username"
                      onIonChange={(e) => {
                        setUsername(e.detail.value);
                      }}
                    ></IonInput>
                  </IonItem>
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
                  <IonItem>
                    <IonLabel position="floating">确认密码</IonLabel>
                    <IonInput
                      type="password"
                      name="passwordCheck"
                      onIonChange={(e) => {
                        setPasswordCheck(e.detail.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <br />
                  <IonButton onClick={onSubmit}>注册</IonButton>
                  <NavLink to={"/login"}>
                    <IonButton fill="clear">登录 →</IonButton>
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

export default Register;
