import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";
import router, { useRouter } from "next/router";

const Login = () => {
  const [data, setData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
  // console.log(data);

  useEffect(() => {
    console.log(appContext.user); //false
    if (appContext.user) {
      console.log("a");
      //すでにログインしてるならリダイレクトする。
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2>ログイン</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset disabled={loading}>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Input
                    disabled={loading}
                    onChange={(e) => handleChange(e)}
                    name="identifier"
                    style={{ height: 50, fontSize: "1.2rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Input
                    disabled={loading}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    name="password"
                    style={{ height: 50, fontSize: "1.2rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <span>
                    <a href="">
                      <small>パスワードをお忘れですか？</small>
                    </a>
                  </span>
                  <Button
                    style={{ float: "right", width: 120 }}
                    color="primary"
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      login(data.identifier, data.password)
                        .then((res) => {
                          setLoading(false);
                          appContext.setUser(res.data.user);
                        })
                        .catch((err) => {
                          setError(err.response);
                          setLoading(false);
                        });
                    }}
                  >
                    {loading ? "ロード中・・・" : "ログイン"}
                  </Button>
                </FormGroup>
              </fieldset>
            </Form>
          </section>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            text-align: center;
            margin-top: 50px;
          }
          .header {
            width: 100%;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .header h2 {
            margin: 0;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
        `}
      </style>
    </Container>
  );
};

export default Login;
