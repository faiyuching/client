import { IonButton, IonButtons } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { followUser, unfollowUser, findUser } from "../../controllers/user";
import { NavLink } from "react-router-dom";

const UserFollow = (props) => {
  const [followersCount, setFollowersCount] = useState(0);
  const [isfollow, setIsFollow] = useState(false);
  useEffect(() => {
    findUser("following", props.me).then((res) => {
      res.forEach((user) => {
        if (user._id === props.you) {
          setIsFollow(true);
        }
      });
    });
    setFollowersCount(props.followers);
  }, [props.me, props.you, props.followers]);

  const setFollowUser = (id) => {
    if (isfollow) {
      unfollowUser(id).then((res) => {
        if (res.status === "success") {
          setIsFollow(false);
          setFollowersCount(followersCount - 1);
          if (props.type === "followers") {
            window.location.reload();
          }
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    } else {
      followUser(id).then((res) => {
        if (res.status === "success") {
          setIsFollow(true);
          setFollowersCount(followersCount + 1);
          if (props.type === "followers") {
            window.location.reload();
          }
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    }
  };

  return (
    <IonButtons slot="end">
      <NavLink to={`/user/${props.you}?type=following`}>
        <IonButton color={props.type === "following" ? "primary" : "medium"}>
          关注了{props.following}
        </IonButton>
      </NavLink>
      <NavLink to={`/user/${props.you}?type=followers`}>
        <IonButton color={props.type === "followers" ? "primary" : "medium"}>
          关注者{followersCount}
        </IonButton>
      </NavLink>
      {!props.hidden && (
        <IonButton
          fill={isfollow ? "clear" : "solid"}
          color={isfollow ? "medium" : "primary"}
          onClick={() => {
            setFollowUser(props.you);
          }}
        >
          {isfollow ? "取关" : "关注"}
        </IonButton>
      )}
    </IonButtons>
  );
};

export default UserFollow;
