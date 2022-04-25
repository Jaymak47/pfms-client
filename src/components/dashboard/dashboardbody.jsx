import React from "react";
import moment from "moment";
import { Row, Card, CardGroup } from "react-bootstrap";
import Projects from "../../components/images/homepageicons/projects.jpg";
import Activities from "../../components/images/homepageicons/activities.jpg";
import Targets from "../../components/images/homepageicons/targets.jpg";
import Tasks from "../../components/images/homepageicons/tasks.jpg";
import StaffAppraisal from "../../components/images/homepageicons/staffappraisal.jpg";
import Training from "../../components/images/homepageicons/training.jpg";
import Feedback from "../../components/images/homepageicons/feedback.jpg";
import Goals from "../../components/images/homepageicons/goals.jpg";
import Sections from "../../components/images/homepageicons/sections.jpg";
import Help from "../../components/images/homepageicons/help.jpg";
import Departments from "../../components/images/homepageicons/departments.jpg";
import { Link } from "react-router-dom";

const DashBoardMainBody = ({
  projects,
  activities,
  targets,
  tasks,
  workplans,
  appraisals,
  feedbacks,
  trainings,
  sectors,
  departments,
  helpcenter,
  lastUpdatedprojects,
  lastUpdatedactivities,
  lastUpdatedtargets,
  lastUpdatedworkplans,
  lastUpdatedappraisals,
  lastUpdatedfeedbacks,
  lastUpdatedtrainings,
  lastUpdatedsectors,
  lastUpdateddepartments,
  lastUpdatedhelpcenter,
}) => {
  return (
    <div>
      <Row className="m-2 ">
        {" "}
        <CardGroup>
          <Card className="m-2">
            <Link style={{ textDecoration: "none" }} to="/projects">
              <Card.Img variant="top" src={Projects} />

              <Card.Body>
                <Card.Title>Projects</Card.Title>
                <Card.Text>
                  A collection of All County Projects by their Departments,
                  Sections, Areas of Implementation
                </Card.Text>
                <Card.Text>
                  <strong>Total Projects ----{projects.length}</strong>
                </Card.Text>
              </Card.Body>

              <Card.Footer>
                <small className="text-muted">
                  Last updated{" "}
                  {moment(lastUpdatedprojects).format("DD-MM-YYYY")}
                </small>
              </Card.Footer>
            </Link>
          </Card>
          <Card className="m-2">
            <Link style={{ textDecoration: "none" }} to="/activities">
              <Card.Img variant="top" src={Activities} />
              <Card.Body>
                <Card.Title>Activities</Card.Title>
                <Card.Text>
                  A Collection of all County Activities based on their specific
                  Projects, Departments and Section
                </Card.Text>
                <Card.Text>
                  <strong>Total Activities ----{activities.length}</strong>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                Last updated{" "}
                {moment(lastUpdatedactivities).format("DD-MM-YYYY")}
              </Card.Footer>
            </Link>
          </Card>
          <Card className="m-2">
            <Link style={{ textDecoration: "none" }} to="/tasks">
              <Card.Img variant="top" src={Tasks} />
              <Card.Body>
                <Card.Title>Activity Tasks</Card.Title>
                <Card.Text>
                  A Collection of all County Tasks based on their specific
                  Activities, Projects Departments and Sections.
                </Card.Text>
              </Card.Body>
              <Card.Text>
                <strong>Total Tasks ----{tasks.length}</strong>
              </Card.Text>
              <Card.Footer>
                Last updated {moment(lastUpdatedtargets).format("DD-MM-YYYY")}
              </Card.Footer>
            </Link>
          </Card>
          <Card className="m-2">
            <Link style={{ textDecoration: "none" }} to="/targets">
              <Card.Img variant="top" src={Targets} />
              <Card.Body>
                <Card.Title>Targets</Card.Title>
                <Card.Text>
                  A Collection of all County Targets based on their specific
                  Activities, Projects Departments and Sections.
                </Card.Text>
              </Card.Body>
              <Card.Text>
                <strong>Total Targets ----{targets.length}</strong>
              </Card.Text>
              <Card.Footer>
                Last updated {moment(lastUpdatedtargets).format("DD-MM-YYYY")}
              </Card.Footer>
            </Link>
          </Card>
        </CardGroup>
      </Row>
      <Row className="m-3">
        <CardGroup>
          <Card>
            <Link style={{ textDecoration: "none" }} to="/selfappraisal">
              <Card.Img variant="top" src={StaffAppraisal} />
              <Card.Body>
                <Card.Title>Staff Appraisal</Card.Title>
                <Card.Text>
                  A Listing of Staff Appraisal Reports and Recommendations
                </Card.Text>
                <Card.Text>
                  <strong>Total Appraisals ----{appraisals.length}</strong>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>
          <Card>
            <Link style={{ textDecoration: "none" }} to="/supervisorappraisal">
              <Card.Img variant="top" src={Feedback} />
              <Card.Body>
                <Card.Title>Feedback</Card.Title>
                <Card.Text>
                  A collection of Feedback Reports from: Employees, Supervisor
                  and HR
                </Card.Text>
                <Card.Text>
                  {/* <strong>Total FeedBacks ----{feedbacks.length}</strong> */}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>
          <Card>
            <Link style={{ textDecoration: "none" }} to="/trainings">
              <Card.Img variant="top" src={Training} />
              <Card.Body>
                <Card.Title>Trainings</Card.Title>
                <Card.Text>
                  A Listing of all Trainings based on Projects, Activities and
                  Departments
                </Card.Text>
                <Card.Text>
                  {/* <strong>Total Training Trainings ----{trainings.length}</strong> */}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>
        </CardGroup>
      </Row>
      <Row className="m-3">
        <CardGroup>
          <Card>
            <Link style={{ textDecoration: "none" }} to="/countygoals">
              <Card.Img variant="top" src={Goals} />
              <Card.Body>
                <Card.Title>County Goals</Card.Title>
                <Card.Text>View County Goals, Vision, and Mission</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>

          <Card>
            <Link style={{ textDecoration: "none" }} to="/sectors">
              <Card.Img variant="top" src={Sections} />
              <Card.Body>
                <Card.Title>Sectors</Card.Title>
                <Card.Text>
                  A Listing of all County Sectors / Units with the Projects,
                  Activities and Targets being undertaken
                </Card.Text>
                <Card.Text>
                  {/* <strong>Total Sectors ----{sectors.length}</strong> */}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>
          <Card>
            <Link style={{ textDecoration: "none" }} to="/departments">
              <Card.Img variant="top" src={Departments} />
              <Card.Body>
                <Card.Title>Departments</Card.Title>
                <Card.Text>
                  A Listing of all County Departments with the Projects,
                  Activities and Targets being undertaken
                </Card.Text>
                <Card.Text>
                  <strong>Total Departments----{departments.length}</strong>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>
          <Card>
            <Link style={{ textDecoration: "none" }} to="/projects">
              <Card.Img variant="top" src={Help} />
              <Card.Body>
                <Card.Title>Help Center</Card.Title>
                <Card.Text>
                  A Collection of Documentations and Guidelines on using the
                  Performance Management System
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Link>
          </Card>
        </CardGroup>
      </Row>
      <Row className="m-3"></Row>
    </div>
  );
};

export default DashBoardMainBody;
