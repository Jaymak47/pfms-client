import React from "react";
import moment from "moment";
import Table from "../../common/table";
import { Modal, Row, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
//import EditAddActivityTask from "./editactivitytask";

const TaskTable = ({
  error,
  tasks,
  onSort,
  sortColumn,
  count,
  name,
  show,
  handleClose,
  handleShow,
  loading,
}) => {
  let numbering = 1;
  const columns = [
    {
      key: "count",
      label: "#",
      content: () => numbering++,
    },
    { path: "activity.project.projectname", label: "Project" },
    { path: "activity.activityname", label: "Activity" },
    { path: "taskname", label: "Task" },

    {
      path: "startdate",
      content: (date) => moment(date.startdate).format("DD-MM-YYYY"),
      label: "Start Date",
    },

    {
      path: "enddate",
      content: (date) => moment(date.enddate).format("DD-MM-YYYY"),
      label: "End Date",
    },

    {
      key: "tasks",
      label: "Actions",
      content: () => (
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
      ),
    },
  ];

  if (loading) {
    return (
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
  }

  return (
    <div>
      <Table
        columns={columns}
        data={tasks}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
        name={name}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>{/* <EditAddActivityTask /> */}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="m-3">
        {error && (
          <div className="ui error message" style={{ marginBottom: 20 }}>
            <ul
              className="list "
              style={{
                "text-align": "center",
              }}
            >
              <li>
                {error.networkError
                  ? "Network Error: - Error connecting to PFMS Database Server: Contact System Administrator"
                  : error.graphQLErrors[0].message}
              </li>
            </ul>
          </div>
        )}
      </Row>
    </div>
  );
};

export default TaskTable;
