import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import { Modal, Row, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditActivity from "./editactivity";

const Activities = ({
  error,
  activities,
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
    {
      path: "activityno",
      label: "Activity No",
      content: (activity) => (
        <OverlayTrigger
          overlay={<Tooltip id={`tooltip-top`}>More Details</Tooltip>}
        >
          <Link to={`/activity/${activity.id}`}>{activity.activityno}</Link>
        </OverlayTrigger>
      ),
    },
    { path: "activityname", label: "Activity Name" },

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
      key: "activities",
      label: "Actions",
      content: (activity) => (
        <Link to={`/activity/${activity.id}`}>
          <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
            <button
              onClick={handleShow}
              className="btn text-warning btn-act"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE254;</i>
            </button>
          </OverlayTrigger>
        </Link>
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
        data={activities}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
        name={name}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditActivity />
        </Modal.Body>
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

export default Activities;
