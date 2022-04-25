import React from "react";
import moment from "moment";
import Table from "../../common/table";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditTraining from "./edittraining";

const TrainingTable = ({
  trainings,
  onSort,
  sortColumn,
  count,
  show,
  handleClose,
  loading,
  handleShow,
}) => {
  let numbering = 1;
  const columns = [
    {
      path: "#",
      key: "count",
      label: "#",
      content: () => numbering++ - trainings.length,
    },
    { path: "trainingno", label: "Training No" },
    { path: "trainingname", label: "Training" },
    { path: "trainingdescription", label: "Training Description" },
    { path: "task.activity.project.projectname", label: "Project" },
    { path: "task.activity.activityname", label: "Activity" },
    { path: "task.taskname", label: "Task" },
    { path: "venue", label: "Venue" },
    { path: "resources", label: "Resources" },
    {
      path: "startdate",
      content: (date) => moment(date.startdate).format("DD-MM-YYYY"),
      label: "Start Date",
      date: { type: Date, default: Date },
    },

    {
      path: "enddate",
      content: (date) => moment(date.enddate).format("DD-MM-YYYY"),
      label: "End Date",
    },

    { path: "comments", label: "comments" },
    {
      key: "targets",
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
        data={trainings}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Target</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTraining />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrainingTable;
