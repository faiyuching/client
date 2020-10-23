import {
  IonButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React, { useState, useEffect, useContext } from "react";
import { Contexts } from "../../util/contexts"
import { updateUser } from "../../controllers/user";
const UserUpdateInfo = (props) => {
  const auth = useContext(Contexts)
  const [introduction, setIntroduction] = useState("");
  const [city, setCity] = useState("");
  const [field, setField] = useState("");
  const [skill, setSkill] = useState("");
  useEffect(() => {
    setIntroduction(props.introduction);
    setCity(props.city);
    setField(props.field);
    setSkill(props.skill);
  }, [props]);

  const onSubmit = () => {
    const data = new FormData();
    data.append("introduction", introduction || "");
    data.append("city", city || "");
    data.append("field", field || "");
    data.append("skill", skill || "");
    updateUser(props.id, data).then((res) => {
      if (res.status === "success") {
        window.location.href = `/user/${props.id}`;
      }
      if (res.status === "fail") {
        alert(res.message);
        window.location.reload();
      }
    });
  };

  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">一句话介绍</IonLabel>
                  <IonInput
                    type="text"
                    name="introduction"
                    value={introduction}
                    onIonChange={(e) => {
                      setIntroduction(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">现居城市</IonLabel>
                  <IonInput
                    type="text"
                    name="city"
                    value={city}
                    onIonChange={(e) => {
                      setCity(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">专业 / 职业</IonLabel>
                  <IonInput
                    type="text"
                    name="field"
                    value={field}
                    onIonChange={(e) => {
                      setField(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">擅长</IonLabel>
                  <IonInput
                    type="text"
                    name="skill"
                    value={skill}
                    onIonChange={(e) => {
                      setSkill(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>
                <br />
                  {auth.screenSize === "sm" ? (
                    <IonButton expand="block" onClick={onSubmit}>
                      保存
                    </IonButton>
                  ) : (
                    <IonButton onClick={onSubmit}>保存</IonButton>
                  )}
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default UserUpdateInfo;
