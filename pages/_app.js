import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

class MyApp extends App {
  state = {
    user: null,
    //商品保有配列と、合計価格を格納したショッピングカートを用意。
    cart: { items: [], total: 0 },
  };

  componentDidMount() {
    const token = Cookies.get("token");
    const cart = Cookies.get("cart");

    console.log(cart);

    //注文した後に実装するといいね。
    if (cart !== "undefined" && typeof cart === "string") {
      //JSON形式で書かれた文字列をJavaScriptのJSONオブジェクトに変換するメソッド.
      //変換したものはJsonデータとして自由に扱える。
      JSON.parse(cart).forEach((item) => {
        this.setState({
          cart: {
            items: JSON.parse(cart),
            total: (this.state.cart.total += item.price * item.quantity),
          },
        });
      });
    }

    if (token) {
      //クッキーにtokenがあるかどうかをチェック
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        //もし、tokenが有効ではない場合は削除する。
        if (!res.ok) {
          Cookies.remove("token");
          this.setState({ user: null });
          return null;
        }
        //ある場合ははuser状態をセットする。
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  //カートへ商品の追加
  addItem = (item) => {
    //オブジェクトの分割代入
    let { items } = this.state.cart;
    const newItem = items.find((i) => i.id === item.id);
    // console.log(newItem);
    //もしすでにカートに入ってる商品があるなら
    if (!newItem) {
      item.quantity = 1;
      console.log(this.state.cart.total, item.price);
      //cartに追加する。
      this.setState(
        {
          cart: {
            items: [...items, item], //items配列の最後にitemを追加
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
    //まだカートに入ってない商品なら
    else {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? //もしすでにあるなら
                  Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: this.state.cart.total + item.price,
          },
        },
        () => Cookies.set("cart", this.state.cart.items)
      );
    }
  };

  removeItem = (item) => {
    let { items } = this.state.cart; //現在のカート状態。
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          cart: {
            items: this.state.cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity - 1 })
                : item
            ),
            total: this.state.cart.total - item.price,
          },
        },
        () => Cookies.set("cart", this.state.items)
      );
    } else {
      //注文数が1のときは注文を削除する。
      const items = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === newItem.id); //idが一致したindex番号を返す。
      items.splice(index, 1); //それを削除する。
      this.setState(
        { cart: { items: items, total: this.state.cart.total - item.price } },
        () => Cookies.set("cart", this.state.items)
      );
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
          cart: this.state.cart,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </AppContext.Provider>
    );
  }
}

export default withData(MyApp);
