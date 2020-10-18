import {
  IonButton,
  IonButtons,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { updatePicture } from "../../controllers/user";
const UserUpdatePicture = (props) => {
  const [isUploadHidden, setUploadHidden] = useState(true);
  const [pictureUrl, setPictureUrl] = useState("");
  useEffect(() => {
    setPictureUrl(props.picture);
  }, [props.picture]);

  const [selectedPicture, setSelectedPicture] = useState(null);
  const pictureSelectedHandle = (event) => {
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1000000) {
        alert("图片不能大于1MB");
      }
      if (event.target.files[0].size <= 1000000) {
        setSelectedPicture(event.target.files[0]);
        setPictureUrl(window.URL.createObjectURL(event.target.files[0]));
        setUploadHidden(false);
      }
    }
  };
  const pictureUploaddHandle = () => {
    const pictureData = new FormData();
    pictureData.append("picture", selectedPicture);
    updatePicture(props.id, pictureData).then((res) => {
      if (res.status === "success") {
        setUploadHidden(true);
        window.location.reload();
      }
      if (res.status === "fail") {
        alert(res.message);
        window.location.reload();
      }
    });
  };
  return (
    <>
      <img
        src={pictureUrl}
        alt="background"
        width="100%"
        //   onClick={() => {
        //     document.getElementById("getFile").click();
        //   }}
      />
      <IonItem lines="none">
        <IonCardTitle>编辑个人资料</IonCardTitle>
        <input
          type="file"
          onChange={pictureSelectedHandle}
          style={{ display: "none" }}
          id="getPicture"
          accept="image/*"
        ></input>
        <IonButtons slot="end">
          <IonButton
            color="medium"
            onClick={() => {
              document.getElementById("getPicture").click();
            }}
          >
            更换图片
          </IonButton>
          {!isUploadHidden && (
            <IonButton
              fill="solid"
              color="primary"
              onClick={pictureUploaddHandle}
              hidden={isUploadHidden}
            >
              保存
            </IonButton>
          )}
        </IonButtons>
      </IonItem>
    </>
  );
};

export default UserUpdatePicture;
