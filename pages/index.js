import { useState } from "react";
import { Button, Alert, InputGroupText } from "reactstrap";
import { Col, Input, InputGroup, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantList";

const Home = () => {
  const [query, setQuery] = useState("");
  // <div>
  //   <div>
  //     {/* <Alert color="primary">Hello Project</Alert>
  //     &nbsp; <Button color="primary">Hello from nextjs</Button>
  //     <RestaurantList /> */}
  //   </div>
  // </div>
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText addonType="append"> Search </InputGroupText>
              <Input
                onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
                value={query}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
