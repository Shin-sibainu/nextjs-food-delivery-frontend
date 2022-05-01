import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Container, Nav, NavItem } from "reactstrap";

const Layout = (props) => {
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
            <Link href="/login">
              <a className="nav-link">サインイン</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href="/register">
              <a className="nav-link">サインアップ</a>
            </Link>
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
