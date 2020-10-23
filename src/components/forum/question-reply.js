import React, { useState, useContext } from "react";
import {
  IonButton,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea,
  IonLabel,
} from "@ionic/react";
import { createAnswer } from "../../controllers/answer";
import { Contexts } from "../../util/contexts";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const QuestionReply = (props) => {
  const [content, setContent] = useState("");
  const auth = useContext(Contexts);
  const onSubmit = () => {
    const data = new FormData();
    data.append("creator", auth.user._id);
    data.append("question", props.questionId);
    data.append("content", content);
    createAnswer(data).then((res) => {
      if (res.status === "success") {
        window.location.reload();
      }
      if (res.status === "fail") {
        alert(res.message);
      }
    });
  };

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    setContent(text);
  }
  return (
    <IonGrid hidden={props.hidden}>
      <IonRow>
        <IonCol>
          {auth.screenSize === "sm" ? (
            <IonItem>
              <IonLabel position="floating">回复：</IonLabel>
              <IonTextarea
                rows={10}
                onIonChange={(e) => setContent(e.detail.value)}
              ></IonTextarea>
            </IonItem>
          ) : (
            <MdEditor
              value={content}
              placeholder="回复："
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          )}
          <IonItem lines="none">
            <IonButton slot="end" onClick={onSubmit}>
              提交
            </IonButton>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default QuestionReply;
