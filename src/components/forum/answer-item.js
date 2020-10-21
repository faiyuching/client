import React, { useState, useEffect } from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
} from "@ionic/react";
import {
  chatbubblesOutline,
  chevronForwardOutline,
  chevronDownOutline,
} from "ionicons/icons";
import moment from "moment";
import CommentList from "./comment-list";
import { findComment } from "../../controllers/comment";
import parse from "html-react-parser";
import AnswerLike from "./answer-like";
import AnswerReply from "./answer-reply";
import AnswerDelete from "./answer-delete";

const AnswerItem = (props) => {
  const answer = props.answer;
  const [isHiddenComment, setHiddenComment] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    findComment("answer", answer._id).then((data) => {
      setCommentCount(data.length);
      if (data.length >= 3) {
        setHiddenComment(true);
      }
    });
  }, [answer._id, props.filter]);
  const [isHiddenReply, setHiddenReply] = useState(true);

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <img src={answer.creator.avatar} alt={answer.creator.username} />
        </IonAvatar>
        <IonLabel>
          <a
            href={`/user/${answer.creator._id}`}
            style={{ textDecoration: "none", color: "#262626" }}
          >
            {answer.creator.username}
          </a>
          <p>
            {moment(answer.createdAt).format("L") +
              "  " +
              moment(answer.createdAt).format("LT")}
          </p>
        </IonLabel>
      </IonItem>
      <IonItem lines="none">
        <IonText
          style={{
            color: "#121212",
            fontSize: "15px",
            lineHeight: "1.6",
            fontFamily:
              "-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif",
          }}
        >
          {parse(answer.content)}
        </IonText>
      </IonItem>
      <IonItem lines="none">
        <IonButtons slot="start">
          <IonButton
            hidden={commentCount === 0}
            color="medium"
            onClick={() => {
              setHiddenComment(!isHiddenComment);
            }}
          >
            {isHiddenComment ? "展开评论" : "收起评论"}
            <IonIcon
              icon={
                isHiddenComment ? chevronForwardOutline : chevronDownOutline
              }
            ></IonIcon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <AnswerLike answer={answer} />
          <IonButton
            color="medium"
            onClick={() => {
              setHiddenReply(!isHiddenReply);
            }}
          >
            <IonIcon icon={chatbubblesOutline}></IonIcon>
            {commentCount}
          </IonButton>
          <AnswerDelete answer={answer} />
        </IonButtons>
      </IonItem>
      <AnswerReply
        questionId={answer.question}
        answerId={answer._id}
        replyto={answer.creator._id}
        hidden={isHiddenReply}
      />
      <CommentList filter="answer" id={answer._id} hidden={isHiddenComment} />
    </IonCard>
  );
};

export default AnswerItem;
