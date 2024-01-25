import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneTour.scss";
import { KankooContext } from "../../../context/KankooContext";
export const OneTour = () => {
  const [oneTour, setOneTour] = useState();
  const [liked, setLiked] = useState(false);
  const { tour_id } = useParams();
  console.log("tour_id antes de llamar a delTour:", tour_id);
  const { user, myTours, setMyTours, resetMyTours, setResetMyTours } =
    useContext(KankooContext);
  const id = user?.user_id;
  //el precio se muestra si existe el tour y su valor es diferente de 0
  const showPrice = oneTour && oneTour[0]?.price != 0;
  const navigate = useNavigate();

  const handleClickLike = () => {
    setLiked(!liked);
    axios
      .post(`http://localhost:3000/users/${id}/favtours/${tour_id}`, liked)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickRating = () => {
    axios
      .post(`http://localhost:3000/tours/${tour_id}/rating/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/onetour/${tour_id}`)
      .then((res) => {
        setOneTour(res.data.resultOneTour);
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  }, [tour_id]);
  console.log("toooooooooooooooooooooour", oneTour);
  console.log(user);

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
                <div className="OneTourUserInfo d-flex">
                  {/* -------INFO USER */}
                  <div className="d-flex">
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
                  {liked ? (
                    <div className="OneTourLike d-flex justify-content-center align-items-center">
                      <img src="/icons/liked.png" alt="icono de corazón" />
                    </div>
                  ) : (
                    <div className="OneTourLike d-flex justify-content-center align-items-center">
                      <img
                        onClick={handleClickLike}
                        src="/icons/like.png"
                        alt="icono de corazón"
                      />
                    </div>
                  )}
                </div>
                {/* -------------------------DESCRIPCION, RATING, BOTON ADQUIRIR*/}
                <div className="OneTourInfo d-flex align-items-start flex-column p-0">
                  <p>{oneTour[0]?.tour_description}</p>
                  {/* -----------------------RATING */}
                  <div className="ec-stars-wrapper">
                    <a href="#" data-value="1" title="Votar con 1 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="2" title="Votar con 2 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="3" title="Votar con 3 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="4" title="Votar con 4 estrellas">
                      &#9733;
                    </a>
                    <a href="#" data-value="5" title="Votar con 5 estrellas">
                      &#9733;
                    </a>
                  </div>
                </div>
                <div className="d-flex">
                  <button className="OneTourButton">Adquirir</button>
                  <button
                    onClick={() => navigate(`/tours/edittour/${tour_id}`)}
                    className="CardOneTourBoton"
                  >
                    Editar
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
              </div>
            </Col>
            {/* ---------------------------SECCIONES DE RUTA */}
            <Col>
              <h3>Secciones de la ruta de {oneTour[0]?.tour_name}</h3>
              <div md={4} className="d-flex">
                {oneTour?.map((elem, key) => {
                  return (
                    <div
                      key={elem.section_id}
                      className="d-flex flex-column align-items-center"
                    >
                      <img
                        onClick={() =>
                          navigate(`/tours/onesection/${elem.section_id}`)
                        }
                        className="OneTourSectionImg"
                        src={`http://localhost:3000/images/section/${elem.text}`}
                        alt="portada de seccion"
                      />
                      <h5>{elem.section_name}</h5>
                    </div>
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
