import {
  IonCol,
  IonGrid,
  IonRow,
  IonText,
  IonButton,
  IonImg,
  IonItem,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import React, { useContext } from "react";
import Header from "../components/header";
import { Contexts } from "../util/contexts";
const Home = () => {
  const auth = useContext(Contexts);
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonHeader
          hidden={auth.screenSize === "lg"}
        >
          <IonToolbar>
            <IonTitle>关于卓明</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol
              size-xs="12"
              size-sm="11"
              size-md="10"
              size-lg="9"
              style={{ margin: "0 auto" }}
            >
              <IonGrid>
                <IonRow>
                  <IonCol size-xs="12" size-sm="12" size-md="12" size-lg="6">
                    <IonText style={{ fontSize: "64px", fontWeight: "700" }}>
                      宅在家里, 也能救灾
                    </IonText>
                    <p
                      style={{
                        fontSize: "22px",
                        letterSpacing: "-.02em",
                        lineHeight: "160%",
                        color: "#445b78",
                      }}
                    >
                      卓明灾害信息服务中心前身为卓明地震援助信息小组，是一家以专业处理灾害信息、协助救灾资源对接、促进救灾效率为工作内容的志愿者组织，其成员均为深度参与过汶川地震等地震救援工作的信息志愿者。
                    </p>
                    <IonButton size="large" routerLink={"/register"}>
                      加入卓明
                    </IonButton>
                  </IonCol>
                  <IonCol size-xs="0" size-sm="0" size-md="0" size-lg="6">
                    <IonImg src="/main-pic.gif" alt="main-pic"></IonImg>
                  </IonCol>
                  <IonItem></IonItem>
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
