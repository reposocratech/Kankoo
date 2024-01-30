import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneTour.scss";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneSection } from "../../../components/CardOneSection/CardOneSection";
import { StarRating } from "../../../components/Starrating/StarRating.jsx";
import { OtherUser } from "./OtherUser.jsx";

export const OneTour = () => {
  const [oneTour, setOneTour] = useState([]);
  const [liked, setLiked] = useState(false);
  const [acquired, setAcquired] = useState(false);
  const [tourOwnerDetails, setTourOwnerDetails] = useState();
  const [totalDistance, setTotalDistance] = useState(0);
  const [showOtherUser, setShowOtherUser] = useState(false);
  const [creatorId, setCreatorId] = useState();
  const { tour_id } = useParams();
  const { user, setMyTours, resetMyTours, setResetMyTours } =
    useContext(KankooContext);
  const id = user?.user_id;
  //el precio se muestra si existe el tour y su valor es diferente de 0
  const showPrice = oneTour && oneTour[0]?.price != 0;
  const navigate = useNavigate();

  useEffect(() => {
    const likesData = JSON.parse(localStorage.getItem("likes")) || {};
    const initialLikedState = likesData[tour_id];
    setLiked(initialLikedState || false);
    const acquiredData = JSON.parse(localStorage.getItem("acquired")) || {};
    const initialAdcquiredState = acquiredData[tour_id];
    setAcquired(initialAdcquiredState || false);
  }, [tour_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/onetour/${tour_id}`)
      .then((res) => {
        console.log(res.data);
        setOneTour(res.data.resultOneTour);
        setCreatorId(res.data.resultOneTour[0].user_id);
        const tourOwnerUserId = res.data.resultOneTour[0]?.user_id;
        if (tourOwnerUserId) {
          axios
            .get(`http://localhost:3000/users/otheruser/${tourOwnerUserId}`)
            .then((result) => {
              console.log(
                "TOUR OWNER DETAILS DESDE EL BACK",
                result.data.userDetails[0]
              );
              setTourOwnerDetails(result.data.userDetails[0]);
              console.log("TOUR OWNER DETAILS SETEADOS", tourOwnerDetails);
            })
            .catch((userErr) => {
              console.log("Error al obtener detalles del usuario:", userErr);
            });
        }
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  }, [tour_id]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/distance/${tour_id}`)
      .then((res) => {
        setTotalDistance(res.data.resDistance[0]?.total_distance);
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  });

  /*   useEffect(() => {
    axios
      .get(`http://localhost:3000/users/mytours/${user?.user_id}`)
      .then((res) => {
        setMyTours(res.data.resultMyTours);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tour_id, user?.user_id]); */

  const handleClickLike = () => {
    setLiked((prevLiked) => !prevLiked);
    const likesData = JSON.parse(localStorage.getItem("likes")) || {};
    likesData[tour_id] = !liked;
    localStorage.setItem("likes", JSON.stringify(likesData));
    axios
      .post(`http://localhost:3000/users/${id}/favtours/${tour_id}`, {
        liked: !liked,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickAcquired = () => {
    setAcquired((prevAcquired) => !prevAcquired);
    const acquiredData = JSON.parse(localStorage.getItem("acquired")) || {};
    acquiredData[tour_id] = !acquired;
    localStorage.setItem("acquired", JSON.stringify(acquiredData));
    axios
      .post(`http://localhost:3000/users/${id}/boughttours/${tour_id}`, {
        acquired: !acquired,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delTour = (tour_id) => {
    axios
      .put(`http://localhost:3000/tours/deltour/${tour_id}`)
      .then((res) => {
        /* let temp = myTours.filter((elem) => elem.tour_id !== tour_id);
        setMyTours(temp); */
        setResetMyTours(!resetMyTours);
        navigate("/users/mytours");
      })
      .catch((err) => {
        console.log("error borradooo cheee", err);
      });
  };

  return (
    <div className="d-flex align-items-center mt-5">
      <Container fluid className="container-xxl mx-auto">
        {oneTour && (
          <>
            {/* <Row>
              <div className="BackCombo" onClick={() => navigate(-1)}>
                <img
                  className="BackArrow"
                  src="/icons/back.png"
                  alt="flecha a la izquierda"
                />
                <button className="backButton" onClick={() => navigate(-1)}>
                  Volver
                </button>
              </div>
            </Row> */}
            <Row>
              {/* ---------------------PRECIO */}
              {showPrice && <h4>{oneTour[0]?.price}</h4>}

              {/* ------------------------------SECCIONES DE RUTaaaaA */}
              <Col>
                <h3>Secciones de la ruta de {oneTour[0]?.tour_name}</h3>
                <div md={4} className="d-flex">
                  {oneTour?.map((elem) => {
                    return (
                      <CardOneSection
                        elem={elem}
                        oneTour={oneTour}
                        user={user}
                      />
                    );
                  })}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};
