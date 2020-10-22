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
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { createTopic } from "../../controllers/topic";
import { AuthContext } from "../../util/auth-context";
import Header from "../../components/header";
const TopicNew = () => {
  const auth = useContext(AuthContext);
  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const onSubmit = () => {
    const data = new FormData();
    data.append("creator", auth.user._id);
    data.append("name", topicName);
    data.append("description", topicDescription);
    createTopic(data).then((res) => {
      if (res.status === "success") {
        window.location.href = "/forum";
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
            <IonTitle>新建话题</IonTitle>
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
                  <IonCardTitle>新建话题</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">名称</IonLabel>
                    <IonInput
                      type="text"
                      name="name"
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
                      onIonChange={(e) => {
                        setTopicDescription(e.detail.value);
                      }}
                    ></IonTextarea>
                  </IonItem>
                  <br />
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
