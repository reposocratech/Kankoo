import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneTour.scss";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneSection } from "../../../components/CardOneSection/CardOneSection";
import { StarRating } from "../../../components/Starrating/StarRating.jsx";

export const OneTour = () => {
  const [oneTour, setOneTour] = useState([]);
  const [liked, setLiked] = useState(false);
  const [acquired, setAcquired] = useState(false);
  const [tourOwnerDetails, setTourOwnerDetails] = useState();
  const [totalDistance, setTotalDistance] = useState(0);
  const [creatorId, setCreatorId] = useState();
  const [resetOneTour, setResetOneTour] = useState(false);
  const [msg, setMsg] = useState();
  const { tour_id } = useParams();
  const { user, resetMyTours, setResetMyTours } = useContext(KankooContext);
  const id = user?.user_id;

  //el precio se muestra si existe el tour y su valor es diferente de 0
  const showPrice = oneTour && oneTour[0]?.price != 0;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/getoneacquired/${tour_id}/${id}`)
      .then((res) => {
        setAcquired(res.data[0].acquired);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/getonelike/${tour_id}/${id}`)
      .then((res) => {
        setLiked(res.data[0].liked);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/onetour/${tour_id}`)
      .then((res) => {
        setOneTour(res.data.resultOneTour);
        setCreatorId(res.data.resultOneTour[0].user_id);
        const tourOwnerUserId = res.data.resultOneTour[0]?.user_id;
        if (tourOwnerUserId) {
          axios
            .get(`http://localhost:3000/users/otheruser/${tourOwnerUserId}`)
            .then((result) => {
              setTourOwnerDetails(result.data.userDetails[0]);
            })
            .catch((userErr) => {
              console.log("Error al obtener detalles del usuario:", userErr);
            });
        }
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  }, [tour_id, resetOneTour]);

  //llamada a base de datos para el total de distancia del tour
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
  //llamada a la base de datos para dar like
  const handleClickLike = () => {
    if (user && user.user_type != 1) {
      setLiked((prevLiked) => !prevLiked);
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
    } else {
      setMsg("Regístrate como usuario para marcar como favorita una guía");
    }
  };
  //llamada a la base de datos para adquirir tour
  const handleClickAcquired = () => {
    if (user && user.user_type != 1) {
      setAcquired((prevAcquired) => !prevAcquired);
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
    } else {
      setMsg("Regístrate como usuario para adquirir una guía");
    }
  };

  const delTour = (tour_id) => {
    axios
      .put(`http://localhost:3000/tours/deltour/${tour_id}`)
      .then((res) => {
        setResetMyTours(!resetMyTours);
        navigate("/users/mytours");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <Container fluid className="container-xxl mx-auto">
      <button className="OneTourButton" onClick={() => navigate(-1)}>
        Volver
      </button>
      {oneTour && (
        <>
          <Row className="d-flex">
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
                    <StarRating
                      tour_id={tour_id}
                      id={id}
                      setMsg={setMsg}
                      user={user}
                    />
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
                    <div className="oneTourAvatarContainer me-2">
                      <div
                        className="oneTourAvatar"
                        onClick={() => navigate(`/users/oneuser/${creatorId}`)}
                      >
                        {tourOwnerDetails?.avatar ? (
                          <img
                            src={`http://localhost:3000/images/users/${tourOwnerDetails?.avatar}`}
                            alt="User Avatar"
                            className="navAvatarImg"
                          />
                        ) : (
                          <p className="oneTourAvatarInitial">
                            {user?.first_name.charAt(0).toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-column mt-3">
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

              {msg && (
                <div className="divmensajeValidacion">
                  <p className="mensajeValidacion">{msg}</p>
                </div>
              )}

              <Row className="OneTourDescription">
                <p>{oneTour[0]?.tour_description}</p>
              </Row>
              <Row className="OneTourDescription">
                <div className="divDescriptionYAcces d-flex">
                  <img
                    className="iconAccesibilidad mt-2 me-3"
                    src="/assets/silla-de-ruedas.png"
                    alt="icono de persona andando para km"
                  />
                  <div className="infoAccesibilidad">
                    <p className="ms-1">{oneTour[0]?.tour_acces}</p>
                  </div>
                </div>
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
                      {!acquired ? "Adquirir" : "Borrar del carrito"}
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
                    <CardOneSection
                      elem={elem}
                      oneTour={oneTour}
                      user={user}
                      resetOneTour={resetOneTour}
                      setResetOneTour={setResetOneTour}
                    />
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
