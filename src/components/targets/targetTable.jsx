import React from "react";
import moment from "moment";
import Table from "../../common/table";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditTarget from "./edittarget";

const TargetTable = ({
  targets,
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
      key: "count",
      label: "#",
      content: () => numbering++,
    },
    { path: "targetno", label: "Target No" },
    { path: "targetname", label: "Target" },
    { path: "agreedPerformance", label: "Agreed Perfomance Target" },
    { path: "performanceIndicator", label: "Perfomance Indicator" },
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
        data={targets}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Target</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTarget />
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

export default TargetTable;
