import { IonButton, IonIcon, IonItem, IonButtons } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { chatbubblesOutline, heartOutline } from "ionicons/icons";
import { findComment } from "../../controllers/comment";
import { findAnswer } from "../../controllers/answer";
const QuestionListCount = (props) => {
  const [answerLike, setAnswerLike] = useState(0);
  const [commentLike, setCommentLike] = useState(0);
  const [answerReply, setAnswerReply] = useState(0);
  const [commentReply, setCommentReply] = useState(0);
  useEffect(() => {
    findAnswer("question", props.questionId).then((data) => {
      setAnswerReply(data.length);
      let answerLikeCount = 0;
      data.forEach((answer) => {
        answerLikeCount += answer.like.length;
      });
      setAnswerLike(answerLikeCount);
    });
    findComment("question", props.questionId).then((data) => {
      setCommentReply(data.length);
      let commentLikeCount = 0;
      data.forEach((comment) => {
        commentLikeCount += comment.like.length;
      });
      setCommentLike(commentLikeCount);
    });
  }, [props.questionId]);

  return (
    <IonItem lines="none">
      <IonButtons slot="end">
        <IonButton color="medium">
          <IonIcon icon={heartOutline}></IonIcon>
          {props.questionLike + answerLike + commentLike}
        </IonButton>
        <IonButton color="medium">
          <IonIcon icon={chatbubblesOutline}></IonIcon>
          {answerReply + commentReply}
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default QuestionListCount;
