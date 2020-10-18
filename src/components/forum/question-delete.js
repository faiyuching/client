import React, { useState } from "react";
import {
  IonButton,
  IonItem,
  IonIcon,
  IonPopover,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { deleteQuestion } from "../../controllers/question";

const QuestionDelete = (props) => {
  const questionId = props.questionId;
  const [showDelete, setShowDelete] = useState(false);
  const DeleteQuestion = () => {
    deleteQuestion(questionId).then((res) => {
      if (res.status === "success") {
        window.location.href = "/forum";
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
              DeleteQuestion();
            }}
          >
            确认
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default QuestionDelete;
