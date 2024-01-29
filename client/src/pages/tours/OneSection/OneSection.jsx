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
  console.log("section resorucers", sectionResources);
  return (
    <>
      <Container className="OneSectionFather">
        <Row>
          <div>
            <button className="OneSectionBtn" onClick={() => navigate(-1)}>
              Atras
            </button>
          </div>
          <div>
            <h2>{oneSection?.section_name}</h2>
            <hr className="OneSectionSubline" />
          </div>
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
          <>
            {sectionResources?.map((e) => {
              if (e.resource_type === 1) {
                return (
                  <Col>
                    <ImagesSection sectionResources={e} />;
                    <div>
                      <InfoSection
                        className="OneSectionResourceInfo"
                        oneSection={oneSection}
                      />
                    </div>
                  </Col>
                );
              }
              if (e.resource_type === 3 && showResources) {
                return (
                  <Col>
                    {" "}
                    <VideoSection
                      sectionResources={e}
                      className="VideoSection"
                    />
                  </Col>
                );
              }
              if (e.resource_type === 2 && !showResources) {
                return (
                  <Col>
                    <AudioSection sectionResources={e} />;
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
