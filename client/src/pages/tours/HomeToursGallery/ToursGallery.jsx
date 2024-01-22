import React, { useContext, useState } from "react";
import { Form, FormControl, Col, Row } from "react-bootstrap";
import "./ToursGallery.scss";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";
import { textSensitive } from "../../../../helpers/utils";
export const ToursGallery = () => {
  const { allTours, setAllTours } = useContext(KankooContext);
  const [showAllTours, setShowAllTours] = useState(true);
  const [foundTours, setFoundTours] = useState();
  const [filter, setFilter] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleClick = (e) => {
    if (filter === "") {
      setFoundTours(allTours);
      console.log(allTours);
    } else {
      const tempArray = allTours.filter((e) => {
        return (
          textSensitive(e.tour_name, filter) ||
          textSensitive(e.tour_description, filter) ||
          textSensitive(e.tour_city, filter)
        );
      });
      setFoundTours(tempArray);
      setShowAllTours(false);
    }
  };

  return (
    <Col>
      <Row>
        <Form className="gallerySearchbar d-flex mx-auto">
          <FormControl
            type="search"
            placeholder="🔍 ¿Qué te apetece visitar?"
            className="mr-2"
            aria-label="Buscar"
            onChange={onChange}
            value={filter}
          />
          <button type="button" className="galleryButton" onClick={handleClick}>
            Buscar
          </button>
        </Form>
      </Row>
      <Row className="d-flex justify-content-around align-items-center" md={4}>
        {showAllTours && (
          <>
            {allTours?.map((elem) => {
              return <CardOneTour key={elem.tour_id} elem={elem} />;
            })}
          </>
        )}

        {foundTours?.map((elem) => {
          return <CardOneTour key={elem.tour_id} elem={elem} />;
        })}
      </Row>
    </Col>
  );
};
