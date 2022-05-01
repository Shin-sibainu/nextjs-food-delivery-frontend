import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);
  //   console.log(data.restaurants[0]);
  if (error) return "Error loading restaurants";

  if (loading) return <h1>Fetching</h1>;

  if (data.restaurants && data.restaurants.length) {
    //検索機能
    // const searchQuery = data.restaurants.filter((query) => {
    //   query.name.toLowerCase().includes(props.search);
    //   //   console.log(data.restaurants[0]);
    //   console.log(query.name.toLowerCase());
    // });
    const searchQuery = data.restaurants;
    // console.log(props.search);
    // console.log(searchQuery);
    //もしレストランの名前があるなら。
    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/restaurants/${res.id}`}
                    href={`/restaurants?id=${res.id}`}
                  >
                    <a className="btn btn-primary">もっと見る</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>レストランが見つかりません</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
};

export default RestaurantList;
