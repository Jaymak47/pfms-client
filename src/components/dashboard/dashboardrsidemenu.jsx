import React from "react";
import moment from "moment";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

const DashBoardRsideMenu = ({ trainings, projects, activities }) => {
  let activekey = -1;

  return (
    <div>
      <div className="list-group-item-warning p-3">
        <h5>
          <strong>Current Updates</strong>
        </h5>
        <Accordion defaultActiveKey="0">
          {trainings
            .filter((item, idx) => idx < 5)
            .map((training) => (
              <div>
                <Accordion.Item eventKey={activekey++}>
                  <Accordion.Header>{training.trainingname}</Accordion.Header>
                  <Accordion.Body>
                    <strong>Description: </strong>
                    {training.description} <br />
                    <strong>Venue: </strong>
                    {training.venue} <br />
                    <strong>
                      Start Date:{" "}
                      {moment(training.startdate).format("DD-MM-YYYY")}
                    </strong>
                    <br />
                    <strong>
                      End Date:{moment(training.startdate).format("DD-MM-YYYY")}
                    </strong>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
        </Accordion>
        <Link
          style={{ textDecoration: "none" }}
          to="/trainings"
          className="readmore"
        >
          More Trainings
        </Link>
      </div>
      <div className="list-group-item-success p-3">
        {" "}
        <h5>
          <strong>Current Projects</strong>
        </h5>
        <Accordion defaultActiveKey="0">
          {projects
            .filter((item, idx) => idx < 5)
            .map((project) => (
              <div>
                <Accordion.Item eventKey={activekey++}>
                  <Accordion.Header>{project.projectname}</Accordion.Header>
                  <Accordion.Body>
                    <strong>Description:</strong>
                    {project.projectdescription} <br />
                    <strong>Project Manager:</strong>
                    {project.employee} <br />
                    <strong>Status:</strong>
                    {project.status} <br />
                    <strong>
                      {" "}
                      Start Date:
                      {moment(project.startdate).format("DD-MM-YYYY")}
                      <br />
                      End Date:{moment(project.startdate).format("DD-MM-YYYY")}
                    </strong>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
        </Accordion>
        <Link
          style={{ textDecoration: "none" }}
          to="/projects"
          className="readmore"
        >
          More Projects
        </Link>
      </div>
      <div className="list-group-item-warning p-3">
        {" "}
        <h5>
          <strong>Current Activities</strong>
        </h5>
        <Accordion defaultActiveKey="0">
          {activities
            .filter((item, idx) => idx < 5)
            .map((activity) => (
              <div>
                <Accordion.Item eventKey={activekey++}>
                  <Accordion.Header>{activity.activityname}</Accordion.Header>
                  <Accordion.Body>
                    <strong>Description:</strong>
                    {activity.activitydescription} <br />
                    <strong>Department:</strong>
                    {activity.project.department.departmentname} <br />
                    <strong>
                      {" "}
                      Start Date:
                      {moment(activity.startdate).format("DD-MM-YYYY")}
                      <br />
                      End Date:{moment(activity.startdate).format("DD-MM-YYYY")}
                    </strong>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
        </Accordion>
        <Link
          style={{ textDecoration: "none" }}
          to="/activities"
          className="readmore"
        >
          More Activities
        </Link>
      </div>
    </div>
  );
};

export default DashBoardRsideMenu;
