import React, { useContext } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import moment from "moment";
import { useActivity } from "../../graphql/queries";
import { AuthContext } from "../../context/auth";
import DeleteButton from "./deletebutton";
import LeftMenusGeneral from "../../components/leftmenusgeneral";
import { useHistory } from "react-router";

function EditActivity(props) {
  const history = useHistory();
  const activityId = props.match.params.activityId;
  const { user } = useContext(AuthContext);

  const { data: getActivity } = useActivity(activityId);

  const handleBack = () => {
    history.push("/activities");
  };

  let postMarkup;
  if (!getActivity) {
    postMarkup = (
      <h1>
        <span
          className="spinner-border"
          style={{
            width: " 3rem",
            height: "3rem",
            textAlign: "center",
            color: "#ee9b00",
          }}
        ></span>
      </h1>
    );
  } else {
    const {
      id,
      createdAt,
      username,
      activitydescription,
      activityno,
      activityname,
      project,
      tasks,
    } = getActivity.getActivity;

    postMarkup = (
      <Row className="mt-2">
        <div class="card text-center mt-5">
          <div class="card-header">
            <h4>Activity Name: </h4>
            {activityname}
          </div>
          <div class="card-body">
            <h5 class="card-title">Activity No : {activityno}</h5>
            <p class="card-text">{activitydescription}</p>
            <h5 class="card-title">Project : {project.projectname}</h5>
            <h5 class="card-title">
              Sector / Department : {project.department.departmentname}
            </h5>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Task No</th>
                <th>Task Name</th>
                <th>Startdate</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.taskno}</td>
                  <td>{task.taskname}</td>
                  <td>{moment(task.startdate).format("DD-MM-YYYY")}</td>
                  <td>{moment(task.enddate).format("DD-MM-YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div class="card-footer text-muted">
            {moment(createdAt).fromNow()}
            {"- : -"}
            {moment(createdAt).format("DD-MM-YYYY")}
          </div>
          <div>
            <Button className="success" onClick={handleBack}>
              Back
            </Button>
            {user && user.username === username && (
              <DeleteButton activityId={id} />
            )}
          </div>
        </div>
      </Row>
    );
  }

  return (
    <>
      {" "}
      <Row>
        <Row className="m-3"></Row>

        <Row className="mt-3">
          <Col md="3" className="listgroup p-3">
            <LeftMenusGeneral user={user} />
          </Col>
          <Col md="9" className="mt-5">
            {postMarkup}
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default EditActivity;
