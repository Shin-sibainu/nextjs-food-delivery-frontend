import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { logout } from "../lib/auth";
import AppContext from "../context/AppContext";

import { Container, Nav, NavItem } from "reactstrap";

const Layout = (props) => {
  const { user, setUser } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>フードデリバリー</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">ホーム</a>
            </Link>
          </NavItem>

          <NavItem className="ml-auto">
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  onClick={() => {
                    logout();
                    setUser(null);
                  }}
                >
                  ログアウト
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">サインイン</a>
              </Link>
            )}
          </NavItem>

          <NavItem>
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link">サインアップ</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
