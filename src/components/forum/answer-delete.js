import React, { useState, useContext } from "react";
import {
  IonButton,
  IonItem,
  IonIcon,
  IonPopover,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { deleteAnswer } from "../../controllers/answer";
import { AuthContext } from "../../util/auth-context";

const AnswerDelete = (props) => {
  const auth = useContext(AuthContext);
  const answer = props.answer;

  const [showDelete, setShowDelete] = useState(false);
  const DeleteAnswer = () => {
    deleteAnswer(answer._id).then((res) => {
      if (res.status === "success") {
        window.location.reload();
      }
      if (res.status === "fail") {
        alert(res.message);
      }
    });
  };

  return (
    <>
      <IonButton
        color="medium"
        onClick={() => setShowDelete(true)}
        hidden={auth.user._id !== answer.creator._id}
      >
        <IonIcon icon={trashOutline}></IonIcon>
      </IonButton>
      <IonPopover
        isOpen={showDelete}
        cssClass="my-custom-class"
        onDidDismiss={(e) => setShowDelete(false)}
      >
        <IonList>
          <IonListHeader>确认删除？</IonListHeader>
          <IonItem button onClick={(e) => setShowDelete(false)}>
            取消
          </IonItem>
          <IonItem
            button
            lines="none"
            onClick={() => {
              DeleteAnswer(answer._id);
            }}
          >
            确认
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default AnswerDelete;
