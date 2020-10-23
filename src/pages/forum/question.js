import {
  IonCol,
  IonGrid,
  IonRow,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import Header from "../../components/header";
import React, { useState, useEffect, useContext } from "react";
import { Contexts } from "../../util/contexts";
import QuestionItem from "../../components/forum/question-item";
import AnswerList from "../../components/forum/answer-list";
import { findAnswer } from "../../controllers/answer";
import QuestionDelete from "../../components/forum/question-delete";
import { NavLink } from "react-router-dom";
const Question = (props) => {
  const auth = useContext(Contexts);
  const [answerCount, setAnswerCount] = useState(0);
  useEffect(() => {
    findAnswer("question", props.match.params.id).then((data) => {
      setAnswerCount(data.length);
    });
  }, [props.match.params.id]);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader
          hidden={auth.screenSize === "lg"}
        >
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/forum" text="返回" />
            </IonButtons>
            <IonTitle>查看帖子</IonTitle>
            <IonButtons slot="end">
            <QuestionDelete questionId={props.match.params.id} />
            <NavLink to={`/update/question/${props.match.params.id}`}>
              <IonButton color="medium">
                <IonIcon icon={pencilOutline}></IonIcon>
              </IonButton>
            </NavLink>
          </IonButtons>
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
              <QuestionItem
                question_id={props.match.params.id}
                answerCount={answerCount}
              />
              <AnswerList filter="question" id={props.match.params.id} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Question;
