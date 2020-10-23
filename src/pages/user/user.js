import {
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonLabel,
  IonCard,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import Header from "../../components/header";
import React, { useEffect, useState, useContext } from "react";
import QuestionList from "../../components/forum/question-list";
import UserItem from "../../components/user/user-item";
import { findUserById } from "../../controllers/user";
import { NavLink } from "react-router-dom";
import UserFollow from "../../components/user/user-follow";
import { Contexts } from "../../util/contexts";
import UserList from "../../components/user/user-list";
import { useParams } from "react-router-dom";
import queryString from "query-string";
const User = (props) => {
  const id = useParams().id;
  const type = queryString.parse(props.location.search).type;
  const auth = useContext(Contexts);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    avatar: "",
    picture: "",
    introduction: "",
    city: "",
    field: "",
    skill: "",
    following: [],
    followers: [],
  });
  useEffect(() => {
    if (id !== undefined) {
      console.log(1);
      findUserById(props.match.params.id).then((data) => {
        setUser(data);
      });
    } else {
      if (auth.isLoggedIn) {
        console.log(2);
        findUserById(auth.user._id).then((data) => {
          setUser(data);
        });
      } else {
        console.log(3);
        window.location.href = "/login";
      }
    }
  }, [props.match.params.id, auth.user._id, auth.isLoggedIn, id]);

  const [segmentValue, setSegmentValue] = useState("home")
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader hidden={auth.screenSize === "lg"}>
          <IonToolbar>
            <IonTitle>个人主页</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink={`/update/user/${auth.user._id}`}>编辑</IonButton>
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
              style={{ margin: "0 auto"}}
            >
              <IonCard>
                <img src={user.picture} alt="background" width="100%" />
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <img src={user.avatar} alt="avatar" />
                  </IonAvatar>
                  <IonLabel>
                    <h1 style={{ fontWeight: "bolder" }}>{user.username}</h1>
                    <p>{user.introduction}</p>
                  </IonLabel>
                  {auth.user._id === user._id && (
                    <IonButtons slot="end">
                      <NavLink to={`/update/user/${auth.user._id}`}>
                        <IonButton
                          color="medium"
                          hidden={auth.screenSize === "sm"}
                        >
                          编辑个人资料
                        </IonButton>
                      </NavLink>
                    </IonButtons>
                  )}
                </IonItem>
                <IonItem lines="none">
                  <UserFollow
                    me={auth.user._id}
                    you={user._id}
                    hidden={user._id === auth.user._id}
                    type={type}
                    following={user.following.length}
                    followers={user.followers.length}
                  />
                </IonItem>
                <IonItem lines="none" routerLink={`/user/${user._id}?type=${segmentValue}`} detail={false}> 
                  <IonSegment value={segmentValue} onIonChange={(e) => {setSegmentValue(e.detail.value)}}>
                    <IonSegmentButton value="home">
                      <IonLabel>资料</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="question">
                      <IonLabel>帖子</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>
                </IonItem>
              </IonCard>
              {(type === "home" || type === undefined) && (
                <UserItem user={user} />
              )}
              {type === "question" && user._id !== "" && (
                <QuestionList filter="creator" id={user._id} />
              )}
              {type === "following" && (
                <UserList type="following" id={user._id} />
              )}
              {type === "followers" && (
                <UserList type="followers" id={user._id} />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default User;
