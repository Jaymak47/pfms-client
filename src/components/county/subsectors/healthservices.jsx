import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import { useQuery } from "@apollo/react-hooks";
import {
  LOAD_PROJECTS,
  LOAD_ACTIVITIES,
  LOAD_TRAININGS,
} from "../../../graphql/queries";
import { Row, Col, Button } from "react-bootstrap";
import LeftMenusGeneral from "../../leftmenusgeneral";
import VisionBody from "../dashboard/visionbody";
import DashBoardRsideMenu from "../../../components/dashboard/dashboardrsidemenu";
import AgriliveFishDevStrategies from "./strategicpriorities/agrilivesishdev";

const HealthServices = () => {
  const user = useContext(AuthContext);
  const {
    error: errorProjects,
    loading: loadingProjects,
    data: projectsdata,
  } = useQuery(LOAD_PROJECTS);

  const {
    error: errorActivities,
    loading: loadingActivities,
    data: activitiesdata,
  } = useQuery(LOAD_ACTIVITIES);

  const {
    error: errorTrainings,
    loading: loadingTrainings,
    data: trainingsdata,
  } = useQuery(LOAD_TRAININGS);

  const [projects, setProjects] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [activities, setActivities] = useState([]);

  //Load  Data from the Server
  useEffect(() => {
    if (projectsdata) {
      setProjects(projectsdata.getProjects);
    }
  }, [projectsdata]);

  useEffect(() => {
    if (activitiesdata) {
      setActivities(activitiesdata.getActivities);
    }
  }, [activitiesdata]);

  useEffect(() => {
    if (trainingsdata) {
      setActivities(trainingsdata.getTrainings);
    }
  }, [trainingsdata]);

  return (
    <div>
      <Row>
        <Row className="m-5"></Row>

        <Row className="mt-2">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9">
            <Row>
              <Col>
                <div className="sectiondescription">
                  <Row className="m-2">
                    <h1>Health Services</h1>
                  </Row>
                </div>
              </Col>
              <Col lg={3}>
                <h2>Year 2020 -2021 </h2>
                <input
                  type="date"
                  placeholder="MM/DD/YYYY"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                />
                <Row className="m-2">
                  <Button className="btn-warning">Workplans</Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className=" adddataform">
                  <h4>
                    <strong>Vision</strong>{" "}
                  </h4>
                  <h5 className="tabcontentdisplay">
                    Food secure and wealthy county anchored on an innovative,
                    commercially oriented and competitive agriculture sector.
                  </h5>
                </Row>
                <Row className=" adddataform1">
                  <h4>
                    <strong>Mission</strong>{" "}
                  </h4>
                  <h5 className="tabcontentdisplay">
                    To improve the livelihood of Kenyans and ensure food and
                    nutrition security through creation of an enabling
                    environment and ensuring sustainable natural resource
                    management.
                  </h5>
                </Row>
                <Row className=" adddataform">
                  <h4>
                    <strong>Goal</strong>{" "}
                  </h4>
                  <h5 className="tabcontentdisplay">
                    To attain food and nutrition security and income through
                    increased production and value addition in livestock,
                    agriculture and fisheries investments
                  </h5>
                </Row>
                <AgriliveFishDevStrategies />
                <VisionBody />
              </Col>
              <Col lg="3">
                <DashBoardRsideMenu
                  trainings={trainings}
                  projects={projects}
                  activities={activities}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default HealthServices;
