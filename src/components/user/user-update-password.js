import {
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
} from "@ionic/react";
import React, { useState } from "react";
import { updateUser } from "../../controllers/user";

const UserUpdatePassword = (props) => {
  const [password, setPassword] = useState(". . . . . .");
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [isSubmitHidden, setSubmitHidden] = useState(true);

  const onSubmit = () => {
    if (password === passwordCheck) {
      const data = new FormData();
      data.append("password", password);
      updateUser(props.id, data).then((res) => {
        if (res.status === "success") {
          setSubmitHidden(true);
          window.location.reload();
        }
        if (res.status === "fail") {
          alert(res.message);
          window.location.reload();
        }
      });
    }else{
      alert("两次输入的密码不相符")
    }
  };

  return (
    <>
      <IonItem>
        <IonLabel position="stacked">密码：</IonLabel>
        <IonInput
          type="password"
          name="password"
          value={password}
          onIonChange={(e) => {
            setPassword(e.detail.value);
            setSubmitHidden(false);
          }}
        ></IonInput>
      </IonItem>
      <IonItem hidden={isSubmitHidden}>
        <IonLabel position="stacked">确认密码：</IonLabel>
        <IonInput
          type="password"
          name="passwordCheck"
          onIonChange={(e) => {
            setPasswordCheck(e.detail.value);
          }}
        ></IonInput>
        <IonButtons slot="end">
          <IonButton color="primary" onClick={onSubmit} hidden={isSubmitHidden}>
            保存
          </IonButton>
        </IonButtons>
      </IonItem>
    </>
  );
};

export default UserUpdatePassword;
