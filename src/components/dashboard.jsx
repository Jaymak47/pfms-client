import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import DatePickerA from "../common/datepicker";
import { Row, Col, Button, ProgressBar } from "react-bootstrap";
import LeftMenusGeneral from "./leftmenusgeneral";
import DashBoardMainBody from "./dashboard/dashboardbody";
import DashBoardRsideMenu from "./dashboard/dashboardrsidemenu";
import { useQuery } from "@apollo/react-hooks";
import {
  LOAD_PROJECTS,
  LOAD_USERS,
  LOAD_DEPARTMENTS,
  useActivities,
  LOAD_TARGETS,
  LOAD_TASKS,
  LOAD_TRAININGS,
} from "../graphql/queries";
import { useTrainings } from "../graphql/trainings";

function MainDashBoard() {
  const user = useContext(AuthContext);
  const {
    error: errorProjects,
    loading: loadingProjects,
    data: projectsdata,
  } = useQuery(LOAD_PROJECTS);

  const {
    error: activityError,
    data: activitiesdata,
    loading: loadingActivities,
  } = useActivities(user.user.department);

  const {
    error: errorTasks,
    loading: loadingTasks,
    data: tasksdata,
  } = useQuery(LOAD_TASKS);

  const {
    error: errorTargets,
    loading: loadingTargets,
    data: targetsdata,
  } = useQuery(LOAD_TARGETS);

  const {
    error: errorUsers,
    loading: loadingUsers,
    data: usersdata,
  } = useQuery(LOAD_USERS);

  const {
    error: errorDepartments,
    loading: loadingDepartments,
    data: departmentsdata,
  } = useQuery(LOAD_DEPARTMENTS);

  const {
    error: trainingserrors,
    data: trainingsData,
    loading: loadingTrainings,
  } = useTrainings(user.user.department);

  const [Projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [targets, setTargets] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [helpCenter, setHelpCenter] = useState([]);
  const [lastUpdatedProjects, setLastUpdatedProjects] = useState([]);
  const [lastUpdatedActivities, setLastUpdatedActivities] = useState([]);
  const [lastUpdatedTargets, setLastUpdatedTargets] = useState([]);
  const [lastUpdatedAppraisals, setLastUpdatedAppraisals] = useState([]);
  const [lastUpdatedFeedbacks, setLastUpdatedFeedbacks] = useState([]);
  const [lastUpdatedTrainings, setLastUpdatedTrainings] = useState([]);
  const [lastUpdatedSectors, setLastUpdatedSectors] = useState([]);
  const [lastUpdatedDepartments, setLastUpdatedDepartments] = useState([]);
  const [lastUpdatedHelpCenter, setLastUpdatedHelpCenter] = useState([]);

  //Get Data from Server
  useEffect(() => {
    if (projectsdata) {
      setProjects(projectsdata.getProjects);
    }
  }, [projectsdata]);

  useEffect(() => {
    if (usersdata) {
      setUsers(usersdata.getUsers);
    }
  }, [usersdata]);
  useEffect(() => {
    if (departmentsdata) {
      setDepartments(departmentsdata.getDepartments);
    }
  }, [departmentsdata]);

  useEffect(() => {
    if (activitiesdata) {
      setActivities(activitiesdata.getActivities);
    }
  }, [activitiesdata]);

  useEffect(() => {
    if (tasksdata) {
      setTasks(tasksdata.getTasks);
    }
  }, [tasksdata]);

  useEffect(() => {
    if (targetsdata) {
      setTargets(targetsdata.getTargets);
    }
  }, [targetsdata]);

  useEffect(() => {
    if (trainingsData) {
      setTrainings(trainingsData.getTrainings);
    }
  }, [trainingsData]);

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
                <h2>Quick Summary </h2>

                <div className="sectiondescription">
                  <Row className="m-3">
                    <h5>Overall Projects Status</h5>
                    <ProgressBar>
                      <ProgressBar
                        variant="success"
                        now={5}
                        key={1}
                        label="Quarter 1"
                      />
                      <ProgressBar
                        variant="primary"
                        now={20}
                        key={2}
                        label="Quarter 2"
                      />
                      <ProgressBar
                        variant="warning"
                        now={50}
                        key={3}
                        label="Quarter 3"
                      />
                      <ProgressBar
                        variant="secondary"
                        now={25}
                        key={4}
                        label="Quater 4"
                      />
                    </ProgressBar>
                  </Row>
                </div>
              </Col>
              <Col lg={3}>
                <h2>Year 2020 -2021 </h2>
                <DatePickerA />
                <Row className="m-3">
                  <Button className="btn-warning">Workplans</Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <DashBoardMainBody
                  projects={Projects}
                  lastUpdatedProjects={lastUpdatedProjects}
                  activities={activities}
                  lastUpdatedActivities={lastUpdatedActivities}
                  targets={targets}
                  tasks={tasks}
                  lastUpdatedTargets={lastUpdatedTargets}
                  appraisals={appraisals}
                  lastUpdatedAppraisals={lastUpdatedAppraisals}
                  feedbacks={feedbacks}
                  lastUpdatedFeedbacks={lastUpdatedFeedbacks}
                  trainings={trainings}
                  lastUpdatedTrainings={lastUpdatedTrainings}
                  sectors={sectors}
                  lastUpdatedSectors={lastUpdatedSectors}
                  departments={departments}
                  lastUpdatedDepartments={lastUpdatedDepartments}
                  helpCenter={helpCenter}
                  lastUpdatedHelpCenter={lastUpdatedHelpCenter}
                />
              </Col>
              <Col lg="3">
                <DashBoardRsideMenu
                  trainings={trainings}
                  projects={Projects}
                  activities={activities}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </div>
  );
}

export default MainDashBoard;
