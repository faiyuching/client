import React, { useState, useContext } from "react";
import {
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { createComment } from "../../controllers/comment";
import { AuthContext } from "../../util/auth-context";

const AnswerReply = (props) => {
  const auth = useContext(AuthContext);
  const [content, setContent] = useState("");

  const onSubmit = () => {
    const data = new FormData();
    data.append("creator", auth.user._id);
    data.append("question", props.questionId);
    data.append("answer", props.answerId);
    data.append("replyto", props.replyto);
    data.append("content", content);
    createComment(data).then((res) => {
      if (res.status === "success") {
        window.location.reload();
      }
      if (res.status === "fail") {
        alert(res.message);
      }
    });
  };

  return (
    <IonGrid hidden={props.hidden}>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating" color="medium">
              回复{props.username}：
            </IonLabel>
            <IonInput
              type="text"
              name="content"
              value={content}
              onIonChange={(e) => {
                setContent(e.detail.value);
              }}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonButton slot="end" onClick={onSubmit}>
              提交
            </IonButton>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default AnswerReply;
