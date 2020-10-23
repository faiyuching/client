import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import React, { useContext } from "react";
import { Contexts } from "../util/contexts";
import { NavLink } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const Header = () => {
  const auth = useContext(Contexts);
  return (
    <IonHeader hidden={auth.screenSize==="xs" || auth.screenSize==="sm"}>
      <IonToolbar>
        <IonButtons slot="start">
          <img src="/favicon.ico" alt="icon" />
          <NavLink to={"/home"}>
            <IonButton color="dark">
              <IonTitle>卓明</IonTitle>
            </IonButton>
          </NavLink>
          <NavLink to={"/forecast"}>
            <IonButton color="medium">预测</IonButton>
          </NavLink>
          <NavLink to={"/response"}>
            <IonButton color="medium">响应</IonButton>
          </NavLink>
          <NavLink to={"/product"}>
            <IonButton color="medium">产品</IonButton>
          </NavLink>
          <NavLink to={"/forum"}>
            <IonButton>论坛</IonButton>
          </NavLink>
          <NavLink to={"/contribute"}>
            <IonButton color="medium">
              参与开发
              <IonIcon icon={logoGithub}></IonIcon>
            </IonButton>
          </NavLink>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton>搜索</IonButton>
          {auth.isLoggedIn && (
            <>
              <IonButton>通知</IonButton>
              <IonButton>私信</IonButton>
              <NavLink to={`/user`}>
                <IonButton>个人主页</IonButton>
              </NavLink>
              <IonButton
                color="danger"
                onClick={() => {
                  logout();
                }}
              >
                退出
              </IonButton>
            </>
          )}
          {!auth.isLoggedIn && (
            <>
              <NavLink to={"/login"}>
                <IonButton>登录</IonButton>
              </NavLink>
              <NavLink to={"/register"}>
                <IonButton>注册</IonButton>
              </NavLink>
            </>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
