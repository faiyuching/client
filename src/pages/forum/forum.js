import {
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonSearchbar,
  IonButtons,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useContext } from "react";
import { AuthContext } from "../../util/auth-context";
import TopicList from "../../components/forum/topic-list";
import QuestionList from "../../components/forum/question-list";
import queryString from "query-string";
import TopicBanner from "../../components/forum/topic-banner";
import Header from "../../components/header";
const Forum = (props) => {
  const auth = useContext(AuthContext);
  const topic = queryString.parse(props.location.search).topic;
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader
          hidden={auth.screenSize === "md" || auth.screenSize === "lg"}
        >
          <IonToolbar>
            <IonButtons slot={auth.device === "iOS" ? "start" : "end"}>
              <IonButton>话题</IonButton>
            </IonButtons>
            <IonTitle>论坛</IonTitle>
            <IonButtons slot="end">
              <IonButton>按时间</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            <IonCol
              size-md="3"
              size-lg="3"
              hidden={auth.screenSize === "xs" || auth.screenSize === "sm"}
            >
              <TopicList filter="all"/>
            </IonCol>
            <IonCol size-xs="12" size-sm="12" size-md="7" size-lg="7">
              {topic && <TopicBanner id={topic} />}
              <QuestionList filter="topic" id={topic} />
            </IonCol>
            <IonCol
              hidden={auth.screenSize === "xs" || auth.screenSize === "sm"}
            >
              <IonGrid>
                <IonRow>
                  <IonCol size-md="2" size-lg="2">
                    <IonButton routerLink={"/new/question"}>发帖</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          hidden={auth.screenSize === "md" || auth.screenSize === "lg"}
        >
          <IonFabButton routerLink={"/new/question"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Forum;
