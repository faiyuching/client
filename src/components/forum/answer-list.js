import React, { useState, useEffect } from "react";
import AnswerItem from "./answer-item";
import { findAnswer } from "../../controllers/answer";
import { IonItemDivider, IonLabel } from "@ionic/react";

const AnwserList = (props) => {
  const [answerList, setAnswerList] = useState([]);
  useEffect(() => {
    findAnswer(props.filter, props.id).then((data) => {
      setAnswerList(data);
    });
  }, [props]);
  if (!answerList || answerList.length === 0) {
    return null;
  }
  return (
    <>
      <IonItemDivider>
        <IonLabel>{answerList.length}个回复：</IonLabel>
      </IonItemDivider>
      {answerList && answerList.map((answer) => {
        return <AnswerItem key={answer._id} answer={answer}/>;
      })}
    </>
  );
};

export default AnwserList;
