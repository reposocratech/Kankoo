import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./../../tours/OneTour/OtherUser.scss";
import { Container, Row, Col } from "react-bootstrap";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
export const AdminOneUser = () => {
  const [user, setUser] = useState();
  const [userTours, setUserTours] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/getOneUser/${id}`)
      .then((res) => {
        setUser(res.data);
        axios
          .get(`http://localhost:3000/users/mytours/${id}`)
          .then((res) => {
            setUserTours(res.data.resultMyTours);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]); // Agregamos id como dependencia para que useEffect se ejecute cuando id cambie

  return (
    <>
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
              {user?.avatar ? (
                <img
                  src={`http://localhost:3000/images/users/${user?.avatar}`}
                  alt="User Avatar"
                  className="profileAvatarImg"
                />
              ) : (
                <p className="profileAvatarInitial">
                  {user?.first_name.charAt(0).toUpperCase()}
                </p>
              )}
            </div>
            <p>{user?.email}</p>
            <h5>
              {user?.first_name} {user?.last_name}
            </h5>
          </div>
        </Row>
        <Row className="d-flex justify-content-evenly">
          {userTours?.map((elem) => {
            return <CardOneTour key={elem.tour_id} elem={elem} />;
          })}
        </Row>
      </Container>
    </>
  );
};
