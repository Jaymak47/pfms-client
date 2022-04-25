import React from "react";
import Table from "../../common/table";
import { Link } from "react-router-dom";
import { Modal, Row, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const SupervisorappraiseeTable = ({
  error,
  users,
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

  // const currFormat = (num) => {
  //   return parseFloat(num)
  //     .toFixed(2)
  //     .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // };
  const columns = [
    {
      key: "count",
      label: "#",
      content: () => numbering++,
    },
    {
      path: "payrollno",
      label: "Payroll No",
      content: (user) => (
        <OverlayTrigger
          overlay={<Tooltip id={`tooltip-top`}>Appraise Employee </Tooltip>}
        >
          <Link to={`/supervisorappraisal/${user.id}`}>{user.payrollno}</Link>
        </OverlayTrigger>
      ),
    },
    { path: "firstname", label: "Firstname" },
    { path: "surname", label: "Surname" },
    { path: "othernames", label: "Other Names" },
    { path: "designation", label: "Designation" },
    { path: "jobgroup.jobgroupname", label: "Job Group" },
    { path: "department.departmentname", label: "Dutystation/Dept" },
    {
      key: "users",
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
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
        name={name}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
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

export default SupervisorappraiseeTable;
