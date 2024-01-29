import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneTour.scss";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneSection } from "../../../components/CardOneSection/CardOneSection";
import { StarRating } from "../../../components/Starrating/StarRating.jsx";

export const OneTour = () => {
  const [oneTour, setOneTour] = useState();
  const [liked, setLiked] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const { tour_id } = useParams();
  console.log("tour_id antes de llamar a delTour:", tour_id);
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
    axios
      .get(`http://localhost:3000/tours/onetour/${tour_id}`)
      .then((res) => {
        console.log(res.data);
        setOneTour(res.data.resultOneTour);
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
        console.log("LO QUE VIENE DEL BACK", res.data.resDistance);
        console.log("LO QUE SETEAMOS", totalDistance);
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/mytours/${user?.user_id}`)
      .then((res) => {
        setMyTours(res.data.resultMyTours);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tour_id, user?.user_id]);

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

  console.log("one tour", oneTour);

  const delTour = (tour_id) => {
    console.log("tour_id", tour_id);
    axios
      .put(`http://localhost:3000/tours/deltour/${tour_id}`)
      .then((res) => {
        console.log("respuesta de borradooooo chee", res.data);
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
    <>
      {oneTour && (
        <Container>
          <Row>
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
          </Row>
          <Row>
            {/* -----------------INFO TOUR */}
            <Col md={6}>
              <div className="OneTourInfo d-flex flex-column justify-content-center ">
                <div className="d-flex align-items-center">
                  <div>
                    <h2>{oneTour[0]?.tour_name}</h2>
                    <h3>{oneTour[0]?.tour_city}</h3>
                  </div>
                  <div>
                    <Link to={oneTour[0]?.location}>
                      <img
                        className="OneTourLocation"
                        src="/icons/location.png"
                        alt="icono de avión de papel para ubicación"
                      />
                    </Link>
                  </div>
                </div>
                <img
                  src={`http://localhost:3000/images/tours/${oneTour[0]?.cover}`}
                  alt="imagen de la guía turísitca"
                  className="OneTourImg"
                />
                {/* ---------------------PRECIO */}
                {showPrice && <h4>{oneTour[0]?.price}</h4>}
                {/* -----------------------INFO USUARIO, LIKE */}
                <div className="d-flex">
                  {/* -------INFO USER */}
                  <div className="OneTourUserInfo d-flex align-items-center">
                    <img
                      onClick={() => navigate("/users/oneuser")}
                      className="OneTourProfilePicture"
                      src={`http://localhost:3000/images/users/${user?.avatar}`}
                      alt=""
                    />
                    <h5>
                      {user?.first_name} {user?.last_name}
                    </h5>
                  </div>

                  {/* --------------------LIKE */}
                  <div className="OneTourLike d-flex justify-content-center align-items-center">
                    <img
                      onClick={handleClickLike}
                      src={liked ? "/icons/liked.png" : "/icons/like.png"}
                      alt="icono de corazón"
                    />
                  </div>
                </div>

                {/* -------------------------DESCRIPCION, RATING, BOTON ADQUIRIR*/}
                <div className="OneTourInfo d-flex align-items-start flex-column p-0">
                  <p>{oneTour[0]?.tour_description}</p>

                  {/* -----------------------RATING */}
                  <StarRating tour_id={tour_id} id={id} />
                  <p>{parseFloat(totalDistance).toFixed(1)} km</p>
                </div>
                <div className="d-flex">
                  {oneTour[0]?.user_id != user?.user_id && (
                    <button className="OneTourButton">Adquirir</button>
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
                </div>
              </div>
            </Col>
            {/* ------------------------------SECCIONES DE RUTaaaaA */}
            <Col>
              <h3>Secciones de la ruta de {oneTour[0]?.tour_name}</h3>
              <div md={4} className="d-flex">
                {oneTour?.map((elem) => {
                  return (
                    <CardOneSection elem={elem} oneTour={oneTour} user={user} />
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
