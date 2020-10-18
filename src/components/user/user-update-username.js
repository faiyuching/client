import {
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { updateUser } from "../../controllers/user";

const UserUpdateUsername = (props) => {
  const [username, setUserName] = useState("");
  const [isSubmitHidden, setSubmitHidden] = useState(true);
  useEffect(() => {
    setUserName(props.username);
  }, [props.username]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("username", username);
    updateUser(props.id, data).then((res) => {
      if (res.status === "success") {
        setSubmitHidden(true)
        window.location.reload();
      }
      if (res.status === "fail") {
        alert(res.message);
        window.location.reload();
      }
    });
  };

  return (
    <IonItem>
      <IonLabel position="stacked">用户名</IonLabel>
      <IonInput
        type="text"
        name="username"
        value={username}
        onIonChange={(e) => {
          setUserName(e.detail.value);
          setSubmitHidden(false);
        }}
      ></IonInput>
      <IonButtons slot="end">
        <IonButton color="primary" onClick={onSubmit} hidden={isSubmitHidden}>
          保存
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default UserUpdateUsername;
