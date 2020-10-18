import {
  IonItem,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonButtons,
} from "@ionic/react";
import React, { useEffect, useState, useContext } from "react";
import { findTopicById } from "../../controllers/topic";
import { AuthContext } from "../../util/auth-context";
const TopicBanner = (props) => {
  const auth = useContext(AuthContext);
  const [topicItem, setTopicItem] = useState({
    _id: "",
    creator: "",
    name: "",
  });
  useEffect(() => {
    findTopicById(props.id).then((data) => {
      setTopicItem(data);
    });
  });
  return (
    <IonCard>
      {/* <img src="/bg.png" alt="pic" width="100%" /> */}
      <IonItem>
        <IonCardHeader>
          <IonCardSubtitle></IonCardSubtitle>
          <IonCardTitle>{topicItem.name}</IonCardTitle>
        </IonCardHeader>
        {auth.user._id === topicItem.creator && (
          <IonButtons slot="end">
            <IonButton color="medium" href={`/update/topic/${topicItem._id}`}>
              编辑话题
            </IonButton>
          </IonButtons>
        )}
      </IonItem>
      <IonCardContent>{topicItem.description}</IonCardContent>
    </IonCard>
  );
};

export default TopicBanner;
