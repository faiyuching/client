import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import TopicItem from "./topic-item";
import { findTopic } from "../../controllers/topic";
const TopicList = (props) => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    findTopic(props.filter).then((data) => {
      setTopics(data);
    });
  }, [props.filter]);
  return (
    <IonList>
      <IonListHeader>话题</IonListHeader>
      <IonItem routerLink={"/forum"} detail={false}>
        <IonLabel>全部</IonLabel>
      </IonItem>
      {topics && topics.length > 0 ? (
        topics.map((topic) => {
          return <TopicItem key={topic._id} id={topic._id} name={topic.name} />;
        })
      ) : (
        <IonItem>
          <IonLabel>no topics found</IonLabel>
        </IonItem>
      )}
      <IonButton fill="clear" href={"/new/topic"}>
        新建话题
      </IonButton>
    </IonList>
  );
};

export default TopicList;
