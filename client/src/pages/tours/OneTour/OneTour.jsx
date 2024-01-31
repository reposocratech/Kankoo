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
        setResetMyTours(!resetMyTours);
        navigate("/users/mytours");
      })
      .catch((err) => {
        console.log("error borradooo cheee", err);
      });
  };

  return (
    <Container fluid className="container-xxl mx-auto">
      {oneTour && (
        <>
          <Row className="d-flex">
            {/* Card principalllllllllllllll */}
            <Col lg={5} md={12} xs={12} className="d-flex flex-column">
              <Row className="mt-5">
                <h2 className="guideTitle">{oneTour[0]?.tour_name}</h2>
                <div className="d-flex justify-content-between OneTourInfo">
                  <h5 className="guideCity">{oneTour[0]?.tour_city}</h5>
                  <div className="d-flex">
                    <p className="me-2">ver ubicación</p>
                    <Link to={oneTour[0]?.location}>
                      <img
                        className="OneTourLocation ml-auto"
                        src="/icons/location.png"
                        alt="icono de avión de papel para ubicación"
                      />
                    </Link>
                  </div>
                </div>
              </Row>

              <Row className="d-flex align-items-start">
                <img
                  src={`http://localhost:3000/images/tours/${oneTour[0]?.cover}`}
                  alt="imagen de la guía turísitca"
                  className="OneTourImg mt-2"
                />
              </Row>
              <Row className="mt-3">
                <div className="d-flex justify-content-between OneTourInfo">
                  <div className="d-flex">
                    <p className="me-2 pStarts">Puntúa esta guía</p>
                    <StarRating tour_id={tour_id} id={id} />
                  </div>

                  <div className="d-flex">
                    <img
                      className="mb-2 me-1"
                      src="/assets/iconKm.jpg"
                      alt="icono de persona andando para km"
                    />
                    <p className="mt-2">
                      {parseFloat(totalDistance).toFixed(1)} km
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between OneTourInfo">
                  <div className="d-flex align-items-center">
                    <img
                      onClick={() => navigate(`/users/oneuser/${creatorId}`)}
                      className="OneTourProfilePicture mb-0 me-2"
                      src={`http://localhost:3000/images/users/${tourOwnerDetails?.avatar}`}
                      alt=""
                    />
                    <div className="d-flex flex-column">
                      <p className="createFor">Guía creada por:</p>
                      <p className="nameCreatorGuide">
                        {tourOwnerDetails?.first_name}{" "}
                        {tourOwnerDetails?.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="OneTourLike d-flex justify-content-center align-items-center">
                    <img
                      onClick={handleClickLike}
                      src={liked ? "/icons/liked.png" : "/icons/like.png"}
                      alt="icono de corazón"
                    />
                  </div>
                </div>
              </Row>

              <Row className="OneTourDescription">
                <p>{oneTour[0]?.tour_description}</p>
              </Row>
              <Row className="OneTourBotones d-flex justify-content-start">
                {oneTour[0]?.user_id != user?.user_id && (
                  <div className="custom-btn-container">
                    <button
                      className={
                        acquired ? "OneTourButtonDisabled" : "OneTourButton"
                      }
                      onClick={handleClickAcquired}
                    >
                      {acquired ? "Borrar del carrito" : "Adquirir"}
                    </button>
                  </div>
                )}
                {oneTour[0]?.user_id === user?.user_id && (
                  <div>
                    <button
                      onClick={() => navigate(`/tours/edittour/${tour_id}`)}
                      className="OneTourButton"
                    >
                      Editar
                    </button>
                    <button
                      className="OneTourButton"
                      onClick={() => navigate(`/tours/newsection/${tour_id}`)}
                    >
                      Añadir Punto
                    </button>
                    <button
                      className="OneTourButton"
                      type="button"
                      onClick={() => {
                        console.log(
                          "tour_id al hacer clic en el botón:",
                          tour_id
                        );
                        delTour(tour_id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </Row>
            </Col>
            <Col lg={7} md={12} xs={12} className="d-flex flex-column">
              <Row className="mb-5 mt-5">
                <h3 className="h3OneTour">Puntos de esta guía:</h3>
              </Row>
              <Row>
                {oneTour?.map((elem, index) => (
                  <Col key={index} lg={4} md={4} className="d-flex mb-3">
                    <CardOneSection elem={elem} oneTour={oneTour} user={user} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
