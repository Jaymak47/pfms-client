import React from "react";
import Table from "../../common/table";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditDesignation from "./editdesignation";

const DesignationTable = ({
  designations,
  onSort,
  sortColumn,
  count,
  name,
  show,
  handleClose,
  handleShow,
}) => {
  const columns = [
    {
      path: "designationno",
      label: "Designation No",
    },
    { path: "designationname", label: "Designation Name" },
    { path: "designationdescription", label: "Description" },

    {
      key: "like",
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

  return (
    <div>
      <Table
        columns={columns}
        data={designations}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
        name={name}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit JobGroup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDesignation />
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

export default DesignationTable;
