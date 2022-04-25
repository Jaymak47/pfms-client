import React from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditDepartment from "./editdepartment";

const DepartmentTable = ({
  departments,
  onSort,
  sortColumn,
  count,
  name,
  show,
  handleClose,
  handleShow,
}) => {
  let numbering = 1;
  const columns = [
    {
      key: "count",
      label: "#",
      content: () => numbering++,
    },
    {
      path: "departmentno",
      label: "Department No",
      content: (department) => (
        <Link to={`/department/${department.id}`}>
          {department.departmentno}
        </Link>
      ),
    },
    { path: "departmentname", label: "Department Name" },
    { path: "departmentdescription", label: "Description" },

    {
      key: "department",
      label: "Actions",
      content: (department) => (
        <Link to={`/department/${department.id}`}>
          <OverlayTrigger
            overlay={<Tooltip id={`tooltip-top`}>Edit Department</Tooltip>}
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

  return (
    <div>
      <Table
        columns={columns}
        data={departments}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
        name={name}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDepartment />
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

export default DepartmentTable;
