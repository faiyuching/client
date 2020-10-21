import React, { useState, useEffect } from "react";
import { findComment } from "../../controllers/comment";
import CommentItem from "./comment-item";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
const CommentList = (props) => {
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    findComment(props.filter, props.id).then((data) => {
      setCommentList(data);
    });
  }, [props.filter, props.id]);
  if (!commentList || commentList.length === 0) {
    return null;
  }
  return (
    <>
      <IonGrid hidden={props.hidden}>
        <IonRow>
          <IonCol>
            {commentList && commentList.map((comment) => {
              return <CommentItem key={comment._id} comment={comment} />;
            })}
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default CommentList;
