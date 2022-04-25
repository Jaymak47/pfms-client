import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/react-hooks";
import {
  LOAD_PROJECTS,
  LOAD_ACTIVITIES,
  LOAD_TRAININGS,
} from "../../graphql/queries";

import LeftMenusGeneral from "../../components/leftmenusgeneral";
import { Row, Col, Button } from "react-bootstrap";
import DashBoardRsideMenu from "../../components/dashboard/dashboardrsidemenu";
import MissionBody from "./dashboard/missionbody";
import context from "react-bootstrap/esm/AccordionContext";

const CountyMission = () => {
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
                  <Row className="m-3">
                    <h1>County Mission</h1>
                    <h3 className="tabcontentdisplay">
                      Facilitation of an inclusive participatory engagement in
                      development; creation of vibrant and welcoming environment
                      that allows optimal utilization of available resources
                    </h3>
                  </Row>
                </div>
              </Col>
              <Col lg={3}>
                <h2>Year 2020 -2021 </h2>
                <input type="date" placeholder="Calender" />
                <Row className="m-3">
                  <Button className="btn-warning">Workplans</Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <MissionBody />
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

export default CountyMission;
