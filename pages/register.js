import { useContext, useState } from "react";
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
import { registerUser } from "../lib/auth";
import AppContext from "../context/AppContext";

const register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const appContext = useContext(AppContext);
  console.log(data);
  return (
    <Container>
      <Row>
        <Col>
          <div className="paper">
            <div className="header">
              <h2> Udemyフードデリバリー</h2>
            </div>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset disabled={loading}>
                <FormGroup>
                  <Label>ユーザー名：</Label>
                  <Input
                    disabled={loading}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                    value={data.username}
                    type="text"
                    name="username"
                    style={{ height: 50, fontSize: "1.2rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>メールアドレス：</Label>
                  <Input
                    disabled={loading}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                    type="email"
                    name="email"
                    style={{ height: 50, fontSize: "1.2rem" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>パスワード：</Label>
                  <Input
                    disabled={loading}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
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
                      registerUser(data.username, data.email, data.password)
                        .then((res) => {
                          appContext.setUser(res.data.user);
                          setLoading(false);
                        })
                        .catch((err) => {
                          setError(err.response);
                          setLoading(false);
                        });
                    }}
                  >
                    {loading ? "ロード中・・・" : "登録"}
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

export default register;
