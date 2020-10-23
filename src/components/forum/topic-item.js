import { IonItem, IonLabel, IonBadge } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { findQuestion } from "../../controllers/question";
import setTopicColor from "../../controllers/topic-color";
const TopicItem = (props) => {
  const [questionCount, setQuestionCount] = useState([]);
  useEffect(() => {
    findQuestion("topic", props.id).then((data) => {
      setQuestionCount(data.length);
    });
  });
  return (
    <IonItem routerLink={`?topic=${props.id}`} lines="none" detail={false}>
      <IonLabel>{props.name}</IonLabel>
      <IonBadge color={setTopicColor(questionCount)}>{questionCount}</IonBadge>
    </IonItem>
  );
};

export default TopicItem;
