import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonCardContent,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { findUser } from "../../controllers/user";

const UserList = (props) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (props.type!== "" && props.id !== "") {
      findUser(props.type,props.id).then((data) => {
        setUserList(data);
      });
    }
  }, [props.id, props.type]);
  if (!userList || userList.length === 0) {
    return (
      <IonCard>
        <IonCardContent>no users found</IonCardContent>
      </IonCard>
    );
  }

  return (
    <>
      {userList.map((user) => {
        return (
          <IonCard key={user._id} routerLink={`/user/${user._id}/home`}>
            <IonItem>
              <IonAvatar>
                <img src={user.avatar} alt={user.username} />
              </IonAvatar>
              <IonCardHeader>
                <IonCardTitle>{user.username}</IonCardTitle>
                <IonCardSubtitle>{user.introduction}</IonCardSubtitle>
              </IonCardHeader>
            </IonItem>
          </IonCard>
        );
      })}
    </>
  );
};

export default UserList;
