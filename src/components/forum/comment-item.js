import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import { chatbubblesOutline } from "ionicons/icons";
import moment from "moment";
import CommentLike from "./comment-like";
import CommentReply from "./comment-reply";
import CommentDelete from "./comment-delete";

const CommentItem = (props) => {
  const comment = props.comment;
  const [isHiddenReply, setHiddenReply] = useState(true);
  return (
    <>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <img src={comment.creator.avatar} alt={comment.creator.username} />
        </IonAvatar>
        <IonLabel color="medium">
          <a
            href={`/user/${comment.creator._id}`}
            style={{ textDecoration: "none", color: "#262626" }}
          >
            {comment.creator.username}
          </a>
          &nbsp;回复&nbsp;
          <a
            href={`/user/${comment.replyto._id}`}
            style={{ textDecoration: "none", color: "#92949C" }}
          >
            {comment.replyto.username}
          </a>
          <p>
            {moment(comment.createdAt).format("L") +
              "  " +
              moment(comment.createdAt).format("LT")}
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
          {comment.content}
        </IonText>
      </IonItem>
      <IonItem lines="none">
        <IonButtons slot="end">
          <CommentLike comment={comment} />
          <IonButton
            color="medium"
            onClick={() => {
              setHiddenReply(!isHiddenReply);
            }}
          >
            <IonIcon icon={chatbubblesOutline}></IonIcon>
          </IonButton>
          <CommentDelete comment={comment} />
        </IonButtons>
      </IonItem>
      <CommentReply
        questionId={comment.question}
        answerId={comment.answer}
        replyto={comment.creator._id}
        hidden={isHiddenReply}
      />
    </>
  );
};

export default CommentItem;
