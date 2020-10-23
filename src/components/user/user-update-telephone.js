import {
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonButtons,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { updateUser } from "../../controllers/user";

const UserUpdateTelephone = (props) => {
  const [telephone, setTelephone] = useState("");
  const [isSubmitHidden, setSubmitHidden] = useState(true);
  useEffect(() => {
    setTelephone(props.telephone);
  }, [props]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("telephone", telephone);
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
      <IonLabel position="stacked">手机号</IonLabel>
      <IonInput
        type="tel"
        name="telephone"
        value={telephone}
        onIonChange={(e) => {
          setTelephone(e.detail.value);
          setSubmitHidden(false);
        }}
      ></IonInput>
      <IonButtons slot="end">
        {/* <IonButton color="medium" hidden={isSubmitHidden}>
          发送验证码
        </IonButton> */}
        <IonButton color="primary" onClick={onSubmit} hidden={isSubmitHidden}>
          保存
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default UserUpdateTelephone;
