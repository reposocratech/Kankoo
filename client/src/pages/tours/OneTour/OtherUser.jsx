import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./../../users/UserMenu.scss";
import "./OtherUser.scss";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
export const OtherUser = () => {
  const [creatorUser, setCreatorUser] = useState();
  const [creatorTours, setCreatorTours] = useState();
  const { creator_user_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/viewotheruser/${creator_user_id}`)
      .then((res) => {
        setCreatorUser(res.data.result);
        axios
          .get(`http://localhost:3000/users/mytours/${creator_user_id}`)
          .then((res) => {
            setCreatorTours(res.data.resultMyTours);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(creatorTours);
  return (
    <Container>
      <Row className="d-flex flex-column justify-content-start">
        <Col>
          <button className="UserMenuButton" onClick={() => navigate(-1)}>
            Volver
          </button>
        </Col>
      </Row>
      <Row className="d-flex flex-column align-items-center">
        <div className="divOtherUser d-flex flex-column justify-content-center align-items-center">
          <div className="profileAvatar align-items-center">
            {creatorUser?.avatar ? (
              <img
                src={`http://localhost:3000/images/users/${creatorUser?.avatar}`}
                alt="User Avatar"
                className="profileAvatarImg"
              />
            ) : (
              <p className="profileAvatarInitial">
                {creatorUser?.first_name.charAt(0).toUpperCase()}
              </p>
            )}
          </div>
          <p>Las guías de</p>
          <h5>
            {creatorUser?.first_name} {creatorUser?.last_name}
          </h5>
        </div>
      </Row>
      <Row className="mapeoTours d-flex justify-content-evenly">
        {creatorTours?.map((elem) => {
          return <CardOneTour key={elem.tour_id} elem={elem} />;
        })}
      </Row>
    </Container>
  );
};
