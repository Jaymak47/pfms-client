import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import { Modal, Row, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditProjects from "./editProject";

const ProjectTable = ({
  error,
  projects,
  loading,
  onSort,
  sortColumn,
  count,
  name,
  show,
  handleClose,
  handleShow,
}) => {
  let numbering = 1;

  const currFormat = (num) => {
    return parseFloat(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const columns = [
    {
      key: "count",
      label: "#",
      content: () => numbering++,
    },
    {
      path: "projectno",
      label: "Project No",
      content: (project) => (
        <Link to={`/project/${project.id}`}>{project.projectno}</Link>
      ),
    },
    { path: "projectname", label: "Project Name" },
    { path: "projectdescription", label: "Project Description" },
    { path: "department.departmentname", label: "Department" },

    {
      key: "projects",
      label: "Actions",
      content: (project) => (
        <Link to={`/project/${project.id}`}>
          <OverlayTrigger
            overlay={<Tooltip id={`tooltip-top`}>Edit Project</Tooltip>}
          >
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

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

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
        data={projects}
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
          <EditProjects />
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

export default ProjectTable;
