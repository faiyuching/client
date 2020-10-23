import React, { useEffect, useState, useContext } from "react";
import { Contexts } from "../../util/contexts";
import parse from "html-react-parser";
import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { chatbubblesOutline, pencilOutline } from "ionicons/icons";
import { findQuestionById } from "../../controllers/question";
import moment from "moment";
import QuestionReply from "./question-reply";
import QuestionLike from "./question-like";
import QuestionDelete from "./question-delete";
import { NavLink } from "react-router-dom";
import MarkdownIt from "markdown-it";
const QuestionItem = (props) => {
  const mdParser = new MarkdownIt();
  const auth = useContext(Contexts);
  const [question, setQuestion] = useState({
    creator: {
      username: "",
      avatar: "",
    },
    title: "",
    content: "",
    createdAt: "",
    like: [],
  });
  useEffect(() => {
    findQuestionById(props.question_id).then((data) => {
      setQuestion(data);
    });
  }, [props.question_id]);

  const [isHiddenReply, setHiddenReply] = useState(true);

  return (
    <>
      <IonCardHeader>
        <IonCardTitle>{question.title}</IonCardTitle>
      </IonCardHeader>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <img src={question.creator.avatar} alt={question.creator.username} />
        </IonAvatar>
        <IonLabel>
          <a
            href={`/user/${question.creator._id}`}
            style={{ textDecoration: "none", color: "#262626" }}
          >
            {question.creator.username}
          </a>
          <p>
            {moment(question.createdAt).format("L") +
              "  " +
              moment(question.createdAt).format("LT")}
          </p>
        </IonLabel>
        {auth.user._id === question.creator._id && (
          <IonButtons slot="end" hidden={auth.screenSize === "sm"}>
            <QuestionDelete questionId={question._id} />
            <NavLink to={`/update/question/${props.question_id}`}>
              <IonButton color="medium">
                <IonIcon icon={pencilOutline}></IonIcon>
              </IonButton>
            </NavLink>
          </IonButtons>
        )}
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
          {parse(mdParser.render(question.content))}
        </IonText>
      </IonItem>
      <IonItem lines="none">
        <IonButtons slot="end">
          <QuestionLike question={question} />
          <IonButton
            color="medium"
            onClick={() => {
              setHiddenReply(!isHiddenReply);
            }}
          >
            <IonIcon icon={chatbubblesOutline}></IonIcon>
            {props.answerCount}
          </IonButton>
        </IonButtons>
      </IonItem>
      <QuestionReply questionId={props.question_id} hidden={isHiddenReply} />
    </>
  );
};

export default QuestionItem;
