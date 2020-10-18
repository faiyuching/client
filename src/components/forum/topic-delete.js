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
import { deleteTopic } from "../../controllers/topic";
import { AuthContext } from "../../util/auth-context";

const TopicDelete = (props) => {
  const auth = useContext(AuthContext);
  const [showDelete, setShowDelete] = useState(false);
  const DeleteTopic = () => {
    deleteTopic(props.topicId).then((res) => {
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
        hidden={auth.user._id !== props.creatorId}
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
              DeleteTopic();
            }}
          >
            确认
          </IonItem>
        </IonList>
      </IonPopover>
    </>
  );
};

export default TopicDelete;
