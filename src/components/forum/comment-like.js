import React, { useEffect, useState, useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { heartOutline } from "ionicons/icons";
import { likeComment, unlikeComment } from "../../controllers/comment";
import { Contexts } from "../../util/contexts";
const CommentLike = (props) => {
  const auth = useContext(Contexts);
  const comment = props.comment;
  useEffect(() => {
    setLikeCount(comment.like.length);
    comment.like.forEach((id) => {
      if (id === auth.user._id) {
        setIsLike(true);
      }
    });
  }, [comment.like,auth.user._id]);

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const setLikeComment = () => {
    if (isLike) {
      unlikeComment(comment._id).then((res) => {
        if (res.status === "success") {
          setIsLike(false);
          setLikeCount(likeCount - 1);
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    } else {
      likeComment(comment._id).then((res) => {
        if (res.status === "success") {
          setIsLike(true);
          setLikeCount(likeCount + 1);
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    }
  };

  return (
    <IonButton
      color={isLike ? "danger" : "medium"}
      onClick={() => {
        setLikeComment();
      }}
    >
      <IonIcon icon={heartOutline}></IonIcon>
      {likeCount}
    </IonButton>
  );
};

export default CommentLike;
