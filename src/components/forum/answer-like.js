import React, { useEffect, useState, useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { heartOutline } from "ionicons/icons";
import { likeAnswer, unlikeAnswer } from "../../controllers/answer";
import { Contexts } from "../../util/contexts";
const AnswerLike = (props) => {
  const auth = useContext(Contexts);
  const answer = props.answer;
  useEffect(() => {
    setLikeCount(answer.like.length);
    answer.like.forEach((id) => {
      if (id === auth.user._id) {
        setIsLike(true);
      }
    });
  }, [answer.like, auth.user._id]);

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const setLikeAnswer = () => {
    if (isLike) {
      unlikeAnswer(answer._id).then((res) => {
        if (res.status === "success") {
          setIsLike(false);
          setLikeCount(likeCount - 1);
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    } else {
      likeAnswer(answer._id).then((res) => {
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
      disabled={props.disabled}
      color={isLike ? "danger" : "medium"}
      onClick={() => {
        setLikeAnswer();
      }}
    >
      <IonIcon icon={heartOutline}></IonIcon>
      {likeCount}
    </IonButton>
  );
};

export default AnswerLike;
