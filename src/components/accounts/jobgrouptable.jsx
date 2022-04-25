import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditJobGroup from "./editjobgroup";

class JobGroupTable extends Component {
  columns = [
    {
      path: "jobgroupno",
      label: "JobGroup No",
      content: (jobgroup) => (
        <Link to={`/jobgroup/:id${jobgroup._id}`}>{jobgroup.jobgroupno}</Link>
      ),
    },
    { path: "jobgroupname", label: "JobGroup Name" },
    { path: "jobgroupdescription", label: "Description" },

    {
      key: "jobgroups",
      label: "Actions",
      content: () => (
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={this.props.handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
      ),
    },
  ];

  render() {
    const { jobgroups, onSort, sortColumn, count, name, show, handleClose } =
      this.props;

    return (
      <div>
        <Table
          columns={this.columns}
          data={jobgroups}
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
            <EditJobGroup />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close Button
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default JobGroupTable;
