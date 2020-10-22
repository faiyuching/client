import {
  IonContent,
  IonMenu,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonButton,
  IonMenuToggle,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import TopicItem from "./forum/topic-item";
import { findTopic } from "../controllers/topic";
const Menu = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    findTopic("all").then((data) => {
      setTopics(data);
    });
  }, []);
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonListHeader>话题</IonListHeader>
          <IonMenuToggle autoHide={true}>
            <IonItem routerLink={"/forum"}>
              <IonLabel>全部</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {topics && topics.length > 0 ? (
            topics.map((topic) => {
              return (
                <IonMenuToggle autoHide={true}>
                  <TopicItem key={topic._id} id={topic._id} name={topic.name} />
                </IonMenuToggle>
              );
            })
          ) : (
            <IonItem>
              <IonLabel>no topics found</IonLabel>
            </IonItem>
          )}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonMenuToggle autoHide={true}>
                  <IonButton expand="block" href={"/new/topic"}>
                    新建话题
                  </IonButton>
                </IonMenuToggle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
