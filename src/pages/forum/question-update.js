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
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../util/auth-context";
import { useParams } from "react-router-dom";
import { updateQuestion, findQuestionById } from "../../controllers/question";
import { findTopic } from "../../controllers/topic";
import Header from "../../components/header";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const QuestionNew = () => {
  const auth = useContext(AuthContext);
  const questionId = useParams().id;
  const [content, setContent] = useState("");
  const [topicSelect, setTopicSelect] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [title, setTitle] = useState("");
  const [new_topic, setNewTopic] = useState("");

  useEffect(() => {
    findTopic().then((data) => {
      setTopicList(data);
    });
  }, []);

  useEffect(() => {
    findQuestionById(questionId).then((data) => {
      setTitle(data.title);
      setTopicSelect(data.topic);
      setContent(data.content);
    });
  }, [questionId]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("topicSelect", topicSelect);
    data.append("new_topic", new_topic);
    updateQuestion(questionId, data).then((res) => {
      if (res.status === "success") {
        window.location.href = `/question/${questionId}`;
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
            <IonTitle>编辑帖子</IonTitle>
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
                <IonCardTitle>编辑帖子</IonCardTitle>
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
              <MdEditor
                value={content}
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
              <br />
              <IonItem>
                <IonLabel>话题：</IonLabel>
                <IonSelect
                  interface="alert"
                  value={topicSelect}
                  multiple={true}
                  onIonChange={(e) => setTopicSelect(e.detail.value)}
                  name="topic"
                >
                  {topicList.map((topic) => {
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
                    setNewTopic(e.detail.value);
                  }}
                >
                  #
                </IonInput>
              </IonItem>
              <br />
              <IonButton onClick={onSubmit}>发布</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default QuestionNew;
