import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTextarea,
  IonButtons,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/auth-context";
import { useParams } from "react-router-dom";
import { findTopicById, updateTopic } from "../../controllers/topic";
import TopicDelete from "../../components/forum/topic-delete";
import Header from "../../components/header";
const TopicNew = () => {
  const auth = useContext(AuthContext);
  const topicId = useParams().id;
  const [creatorId, setCreatorId] = useState("");
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");

  useEffect(() => {
    if (topicId) {
      findTopicById(topicId).then((data) => {
        setCreatorId(data.creator);
        setTopicName(data.name);
        setTopicDescription(data.description);
      });
    }
  }, [topicId]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("name", topicName || " ");
    data.append("description", topicDescription || " ");
    updateTopic(topicId, data).then((res) => {
      if (res.status === "success") {
        window.location.href = `/forum?topic=${topicId}`;
      }
      if (res.status === "fail") {
        alert(res.message);
      }
    });
  };
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader
          hidden={auth.screenSize === "md" || auth.screenSize === "lg"}
        >
          <IonToolbar>
            <IonTitle>编辑话题</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol
              size-xs="12"
              size-sm="10"
              size-md="8"
              size-lg="6"
              style={{ margin: "0 auto" }}
            >
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>修改话题</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">名称</IonLabel>
                    <IonInput
                      type="text"
                      name="name"
                      value={topicName}
                      onIonChange={(e) => {
                        setTopicName(e.detail.value);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">描述</IonLabel>
                    <IonTextarea
                      type="text"
                      name="description"
                      value={topicDescription}
                      onIonChange={(e) => {
                        setTopicDescription(e.detail.value);
                      }}
                    ></IonTextarea>
                  </IonItem>
                  <br />
                  <IonItem lines="none">
                    <IonButtons slot="end">
                      <TopicDelete topicId={topicId} creatorId={creatorId} />
                    </IonButtons>
                  </IonItem>
                  {auth.screenSize === "xs" || auth.screenSize === "sm" ? (
                    <IonButton expand="block" onClick={onSubmit}>
                      提交
                    </IonButton>
                  ) : (
                    <IonButton onClick={onSubmit}>提交</IonButton>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TopicNew;
