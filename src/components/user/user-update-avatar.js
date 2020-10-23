import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { updateAvatar } from "../../controllers/user";
const UserUpdateAvatar = (props) => {
  const [isUploadHidden, setUploadHidden] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    setAvatarUrl(props.avatar);
  }, [props.avatar]);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatarSelectedHandle = (event) => {
    if (event.target.files[0]) {
      if (event.target.files[0].size > 1000000) {
        alert("图片不能大于1MB");
      }
      if (event.target.files[0].size <= 1000000) {
        setSelectedAvatar(event.target.files[0]);
        setAvatarUrl(window.URL.createObjectURL(event.target.files[0]));
        setUploadHidden(false);
      }
    }
  };
  const avatarUploaddHandle = () => {
    const data = new FormData();
    data.append("avatar", selectedAvatar);
    updateAvatar(props.id, data).then((res) => {
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
    <IonGrid>
      <IonRow>
        <IonCol size-xs="4" size-sm="4" size-md="12" size-lg="12">
          <IonAvatar>
            <img
              src={avatarUrl}
              alt="avatar"
              //   onClick={() => {
              //     document.getElementById("getFile").click();
              //   }}
            />
          </IonAvatar>
        </IonCol>
        <IonCol size-xs="4" size-sm="4" size-md="12" size-lg="12">
          <input
            type="file"
            onChange={avatarSelectedHandle}
            style={{ display: "none" }}
            id="getAvatar"
            accept="image/*"
          ></input>
          <IonButtons>
            <IonButton
              color="medium"
              onClick={() => {
                document.getElementById("getAvatar").click();
              }}
            >
              更换头像
            </IonButton>
          </IonButtons>
        </IonCol>
        <IonCol size-xs="4" size-sm="4" size-md="12" size-lg="12">
          {!isUploadHidden && (
            <IonButton onClick={avatarUploaddHandle} hidden={isUploadHidden}>
              保存
            </IonButton>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default UserUpdateAvatar;
