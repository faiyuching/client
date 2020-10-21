import {
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonBackButton,
  IonButtons,
  IonTextarea,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { updateQuestion, findQuestionById } from "../../controllers/question";
import { findTopic } from "../../controllers/topic";
import { AuthContext } from "../../util/auth-context";
import Header from "../../components/header";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const QuestionUpdate = () => {
  const questionId = useParams().id;
  const [topicList, setTopicList] = useState([]);
  useEffect(() => {
    findTopic("all").then((data) => {
      setTopicList(data);
    });
  }, []);
  const auth = useContext(AuthContext);
  const [topic, setTopic] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [new_topic, setNewTitle] = useState("");

  useEffect(() => {
    findQuestionById(questionId).then((data) => {
      setTitle(data.title);
      setTopic(data.topic);
      setContent(data.content);
    });
  }, [questionId]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("topic", topic);
    data.append("title", title);
    data.append("content", content);
    data.append("new_topic", new_topic);
    updateQuestion(questionId, data).then((res) => {
      if (res.status === "success") {
        window.location.href = "/forum";
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
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader
          hidden={auth.screenSize === "md" || auth.screenSize === "lg"}
        >
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/forum" text="返回" />
            </IonButtons>
            <IonTitle>发帖</IonTitle>
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
              <IonCardHeader
                hidden={auth.screenSize === "sm" || auth.screenSize === "xs"}
              >
                <IonCardTitle>发帖</IonCardTitle>
              </IonCardHeader>
              <IonItem>
                <IonLabel position="floating">标题：</IonLabel>
                <IonInput
                  type="text"
                  name="title"
                  value={title}
                  onIonChange={(e) => {
                    setTitle(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <br />
              {auth.screenSize === "xs" || auth.screenSize === "sm" ? (
                <IonItem>
                  <IonLabel position="floating">内容：</IonLabel>
                  <IonTextarea
                    rows={10}
                    value={content}
                    onIonChange={(e) => setContent(e.detail.value)}
                  ></IonTextarea>
                </IonItem>
              ) : (
                <MdEditor
                  value={content}
                  style={{ height: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
              )}
              <br />
              <IonItem>
                <IonLabel>话题：</IonLabel>
                <IonSelect
                  interface="alert"
                  value={topic}
                  multiple={true}
                  onIonChange={(e) => setTopic(e.detail.value)}
                  name="topic"
                >
                  {topicList &&
                    topicList.map((topic) => {
                      return (
                        <IonSelectOption key={topic._id} value={topic._id}>
                          {topic.name}
                        </IonSelectOption>
                      );
                    })}
                </IonSelect>
              </IonItem>
              <br />
              <IonItem>
                <IonLabel position="stacked">自定义话题：</IonLabel>
                <IonInput
                  type="text"
                  name="new_topic"
                  placeholder="话题一#话题二#话题三"
                  onIonChange={(e) => {
                    setNewTitle(e.detail.value);
                  }}
                >
                  #
                </IonInput>
              </IonItem>
              <br />
              <br />
              {auth.screenSize === "xs" || auth.screenSize === "sm" ? (
                <IonButton expand="block" onClick={onSubmit}>
                  发布
                </IonButton>
              ) : (
                <IonButton onClick={onSubmit}>发布</IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default QuestionUpdate;
