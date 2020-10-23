import React, { useEffect, useState, useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { heartOutline } from "ionicons/icons";
import { likeQuestion, unlikeQuestion } from "../../controllers/question";
import { Contexts } from "../../util/contexts";
const QuestionLike = (props) => {
  const auth = useContext(Contexts);
  const question = props.question;
  useEffect(() => {
    setLikeCount(question.like.length);
    question.like.forEach((id) => {
      if (id === auth.user._id) {
        setIsLike(true);
      }
    });
  }, [question.like,auth.user._id]);

  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const setLikeQuestion = () => {
    if (isLike) {
      unlikeQuestion(question._id).then((res) => {
        if (res.status === "success") {
          setIsLike(false);
          setLikeCount(likeCount - 1);
        }
        if (res.status === "fail") {
          alert(res.message);
        }
      });
    } else {
      likeQuestion(question._id).then((res) => {
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
      onClick={setLikeQuestion}
    >
      <IonIcon icon={heartOutline}></IonIcon>
      {likeCount}
    </IonButton>
  );
};

export default QuestionLike;
