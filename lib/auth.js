import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

//新しいユーザーを登録
export const registerUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { username, email, password })
      .then((res) => {
        //クッキーにjwtを設定
        Cookie.set("token", res.data.jwt);
      });

    resolve(res);
    Router.push("/");
  }).catch((err) => {
    reject(err);
  });
};

export const login = (identifier, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local`, { identifier, password })
      .then((res) => {
        Cookie.set("token", res.data.jwt);
        resolve(res);
        Router.push("/");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = () => {
  Cookie.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  //   window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/");
};
