import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneSection.scss";
import { KankooContext } from "../../../context/KankooContext";
import { InfoSection } from "./InfoSection";
import { AudioSection } from "./AudioSection";
import { VideoSection } from "./VideoSection";
import { ImagesSection } from "./ImagesSection";

export const OneSection = () => {
  const [sectionResources, setSectionResources] = useState([]);

  const [showResources, setShowResources] = useState(false);

  const { section_id, tour_id } = useParams();

  const [oneSection, setOneSection] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/getonesection/${section_id}/${tour_id}`)
      .then((res) => {
        setOneSection(res.data[0]);
      })
      .catch((err) => {
        console.log("Error en la solicitud Axios:", err);
      });
  }, [tour_id, section_id]);

  /*   useEffect(() => {
    const fetchData = async () => {
      if (oneSection?.tour_id && section_id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/tours/onesectionresource/${tour_id}/${section_id}`
          );
          console.log(response);
          setSectionResources(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Indica que la carga de datos ha finalizado
        }
      }
    };

    fetchData();
  }, [section_id, tour_id]); */

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/tours/onesectionresource/${tour_id}/${section_id}`
      )
      .then((res) => {
        setSectionResources(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [section_id, tour_id]);

  console.log("section resorucers", sectionResources);

  return (
    <>
      <Container>
        <Row>
          <button onClick={() => setShowResources(false)}>Audio</button>
          <button onClick={() => setShowResources(true)}>Video</button>
          <Col>
            <InfoSection oneSection={oneSection} />
            <h1>TItulo</h1>
            {sectionResources?.map((e) => {
              if (e.resource_type === 1) {
                return <ImagesSection sectionResources={e} />;
              }

              if (e.resource_type === 3 && showResources) {
                return <VideoSection sectionResources={e} />;
              }

              if (e.resource_type === 2 && !showResources) {
                return <AudioSection sectionResources={e} />;
              }
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};
