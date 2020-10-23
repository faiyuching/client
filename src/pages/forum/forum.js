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
  IonMenuButton,
  IonPopover,
  IonList,
  IonItem,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { add, swapVertical } from "ionicons/icons";
import React, { useState, useContext } from "react";
import { Contexts } from "../../util/contexts";
import TopicList from "../../components/forum/topic-list";
import QuestionList from "../../components/forum/question-list";
import queryString from "query-string";
import TopicBanner from "../../components/forum/topic-banner";
import Header from "../../components/header";
const Forum = (props) => {
  const auth = useContext(Contexts);
  const topic = queryString.parse(props.location.search).topic;
  const sort = queryString.parse(props.location.search).sort;
  const [showPopover, setShowPopover] = useState(false);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader hidden={auth.screenSize === "lg"}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide />
            </IonButtons>
            <IonTitle>论坛</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowPopover(true)}>
                <IonIcon icon={swapVertical}></IonIcon>
              </IonButton>
              <IonPopover
                isOpen={showPopover}
                cssClass="my-custom-class"
                onDidDismiss={(e) => setShowPopover(false)}
              >
                <IonList>
                  <IonListHeader>排序方式</IonListHeader>
                  <IonItem routerLink={`?topic=${topic}&sort=time`}>按时间降序</IonItem>
                  <IonItem routerLink={`?topic=${topic}&sort=hot`}>按热度降序</IonItem>
                  <IonItem routerLink={`?topic=${topic}&sort=notice`}>仅查看关注</IonItem>
                  <IonItem
                    button
                    lines="none"
                    onClick={(e) => setShowPopover(false)}
                  >
                    <IonText color="danger">取消</IonText>
                  </IonItem>
                </IonList>
              </IonPopover>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            <IonCol size-md="3" size-lg="3" hidden={auth.screenSize === "sm"}>
              <TopicList filter="all" />
            </IonCol>
            <IonCol size-xs="12" size-sm="12" size-md="7" size-lg="7">
              {topic && <TopicBanner id={topic} />}
              <QuestionList filter="topic" id={topic} sort={sort} />
            </IonCol>
            <IonCol hidden={auth.screenSize === "sm"}>
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
          hidden={auth.screenSize === "lg"}
        >
          <IonFabButton href={"/new/question"}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Forum;
