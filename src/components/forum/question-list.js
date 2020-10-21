import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { findQuestion } from "../../controllers/question";
import QuestionListCount from "./question-list-count";

const QuestionList = (props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    findQuestion(props.filter, props.id).then((data) => {
      setQuestions(data);
    });
  }, [props.filter, props.id]);
  return (
    <>
      {questions && questions.length > 0 ? (
        questions.map((question) => {
          return (
            <IonCard key={question._id} href={`/question/${question._id}`}>
              <IonCardHeader>
                <IonCardSubtitle>{question.creator.username}</IonCardSubtitle>
                <IonCardTitle>{question.title}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {question.content.length > 150
                  ? question.content.slice(0, 150) + "......"
                  : question.content}
              </IonCardContent>
              <QuestionListCount
                questionId={question._id}
                questionLike={question.like.length}
              />
            </IonCard>
          );
        })
      ) : (
        <IonCard>
          <IonCardContent>no posts found</IonCardContent>
        </IonCard>
      )}
    </>
  );
};

export default QuestionList;
