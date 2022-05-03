import { useEffect } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

//新しいユーザーを登録
export const registerUser = async (username, email, password) => {
  await axios
    .post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((res) => {
      //クッキーにjwtを設定
      Cookie.set("token", res.data.jwt);
      // window.location.reload();
      // Router.push("/");
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (identifier, password) => {
  await axios
    .post(`${API_URL}/auth/local`, { identifier, password })
    .then((res) => {
      Cookie.set("token", res.data.jwt);
      // Router.push("/");
      // window.location.reload();
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
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
