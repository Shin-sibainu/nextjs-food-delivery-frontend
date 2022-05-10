import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import AppContext from "../../context/AppContext";
import CardSection from "./CardSection";

const CheckoutForm = () => {
  const [data, setData] = useState({
    address: "",
    stripe_id: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const appContext = useContext(AppContext);

  const handleChange = (e) => {
    const updateItem = (data[e.target.name] = e.target.value);
    //更新した商品情報を追加
    setData({ ...data, updateItem });
  };

  //注文を確定させる関数
  const submitOrder = async () => {
    const cardElement = elements.getElement(CardElement);
    const token = await stripe.createToken(cardElement);
    // console.log(token);
    const userToken = Cookies.get("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: userToken && {
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        amount: Number(Math.round(appContext.cart.total)),
        dishes: appContext.cart.items,
        address: data.address,
        token: token.token.id,
      }),
    });

    if (!response.ok) {
      setError(response.statusText);
    } else {
      setSuccessMsg("商品の購入に成功しました！");
    }
  };

  return (
    <div className="paper">
      <h5>あなたの情報</h5>
      <hr />
      <FormGroup>
        <div>
          <Label>住所</Label>
          <Input name="address" onChange={(e) => handleChange(e)} />
        </div>
      </FormGroup>

      <CardSection
        submitOrder={submitOrder}
        stripeError={error}
        stripeSuccess={successMsg}
      />

      <style jsx global>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            height: 550px;
            padding: 30px;
            background: #fff;
            border-radius: 6px;
            margin-top: 90px;
          }
          .form-half {
            flex: 0.5;
          }
          * {
            box-sizing: border-box;
          }
          body,
          html {
            background-color: #f6f9fc;
            font-size: 18px;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          }
          h1 {
            color: #32325d;
            font-weight: 400;
            line-height: 50px;
            font-size: 40px;
            margin: 20px 0;
            padding: 0;
          }
          .Checkout {
            margin: 0 auto;
            max-width: 800px;
            box-sizing: border-box;
            padding: 0 5px;
          }
          label {
            color: #6b7c93;
            font-weight: 300;
            letter-spacing: 0.025em;
          }
          button {
            white-space: nowrap;
            border: 0;
            outline: 0;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            padding: 0 14px;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
              0 1px 3px rgba(0, 0, 0, 0.08);
            color: #fff;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
            background-color: #6772e5;
            text-decoration: none;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
            margin-top: 10px;
          }
          form {
            margin-bottom: 40px;
            padding-bottom: 40px;
            border-bottom: 3px solid #e6ebf1;
          }
          button:hover {
            color: #fff;
            cursor: pointer;
            background-color: #7795f8;
            transform: translateY(-1px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
              0 3px 6px rgba(0, 0, 0, 0.08);
          }
          input,
          .StripeElement {
            display: block;
            background-color: #f8f9fa !important;
            margin: 10px 0 20px 0;
            max-width: 500px;
            padding: 10px 14px;
            font-size: 1em;
            font-family: "Source Code Pro", monospace;
            box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
              rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            background: white;
          }
          input::placeholder {
            color: #aab7c4;
          }
          input:focus,
          .StripeElement--focus {
            box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
              rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
            -webkit-transition: all 150ms ease;
            transition: all 150ms ease;
          }
          .StripeElement.IdealBankElement,
          .StripeElement.PaymentRequestButton {
            padding: 0;
          }
        `}
      </style>
    </div>
  );
};

export default CheckoutForm;
