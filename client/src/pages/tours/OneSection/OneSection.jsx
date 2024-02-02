import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./OneSection.scss";
import { InfoSection } from "./InfoSection";
import { AudioSection } from "./AudioSection";
import { VideoSection } from "./VideoSection";
import { ImagesSection } from "./ImagesSection";

export const OneSection = () => {
  const [sectionResources, setSectionResources] = useState([]);
  const [showResources, setShowResources] = useState(false);
  const { section_id, tour_id } = useParams();
  const [oneSection, setOneSection] = useState();
  const [activeIcon, setActiveIcon] = useState("");
  const navigate = useNavigate();
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

  return (
    <>
      <Container
        fluid
        lg={6}
        md={12}
        sm={12}
        xs={12}
        className="OneSectionFather "
      >
        <Row className="OneSectionResourcesContainer ">
          <div className="OneSectionBtnContainer ">
            <button className="OneSectionBtn " onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
          <Row>
            <Col>
              <div className="OneSectionResourcesControls">
                <Col>
                  <div className="Textosofresources">
                    <h2>{oneSection?.section_name}</h2>
                    <hr className="OneSectionSubline" />
                    <InfoSection
                      className="OneSectionResourceInfo"
                      oneSection={oneSection}
                    />
                  </div>
                </Col>
                <div className="OneSectionResourceIcons">
                  <i
                    className={`material-symbols-outlined OneSectionResourceOneIcon ${
                      !showResources && activeIcon !== "video" ? "active" : ""
                    }`}
                    onClick={() => {
                      setShowResources(false);
                      setActiveIcon("audio");
                    }}
                  >
                    headphones
                  </i>
                  <i
                    className={`material-symbols-outlined OneSectionResourceOneIcon ${
                      showResources || activeIcon === "video" ? "active" : ""
                    }`}
                    onClick={() => {
                      setShowResources(true);
                      setActiveIcon("video");
                    }}
                  >
                    video_library
                  </i>
                </div>
              </div>
            </Col>
          </Row>
          <>
            {sectionResources
              .sort((a, b) => {
                // Ordenar por tipo de recurso: Video y Audio primero, luego Imágenes
                const orderPriority = {
                  3: 0, // Video
                  2: 1, // Audio
                  1: 2, // Imágenes
                };
                return (
                  orderPriority[a.resource_type] -
                  orderPriority[b.resource_type]
                );
              })
              .map((e) => {
                if (e.resource_type === 3 && showResources) {
                  return (
                    <Col
                      key={e.id}
                      className="VideoSection d-flex justify-content-center"
                    >
                      <VideoSection sectionResources={e} />
                    </Col>
                  );
                }
                if (e.resource_type === 2 && !showResources) {
                  return (
                    <Col
                      key={e.id}
                      className="AudioSection d-flex justify-content-center "
                    >
                      <AudioSection sectionResources={e} />
                    </Col>
                  );
                }
                if (e.resource_type === 1) {
                  return (
                    <Col
                      key={e.id}
                      className="ImageSection d-flex justify-content-center "
                    >
                      <ImagesSection sectionResources={e} />
                    </Col>
                  );
                }
              })}
          </>
        </Row>
      </Container>
    </>
  );
};
