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
import { deleteComment } from "../../controllers/comment";
import { AuthContext } from "../../util/auth-context";

const CommentDelete = (props) => {
  const auth = useContext(AuthContext);
  const comment = props.comment;
  const [showDelete, setShowDelete] = useState(false);
  const DeleteComment = () => {
    deleteComment(comment._id).then((res) => {
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
        hidden={auth.user._id !== comment.creator._id}
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
              DeleteComment();
            }}
          >
            确认
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default CommentDelete;
