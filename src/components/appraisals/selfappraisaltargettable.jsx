import { Link } from "react-router-dom";
import Table from "../../common/table";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditTarget from "./edittarget";
import { MdCreditScore } from "react-icons/md";

const SelfappraisalTable = ({
  targets,
  onSort,
  sortColumn,
  count,
  show,
  handleClose,
  loading,
  targetId,
  appraiseTarget,
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
      path: "targetname",
      label: "Target",
      content: (target) => (
        <OverlayTrigger
          overlay={<Tooltip id={`tooltip-top`}>Appraise Target</Tooltip>}
        >
          <span onClick={() => appraiseTarget(target.id)}>
            {target.targetname}
          </span>
        </OverlayTrigger>
      ),
    },

    { path: "task.taskname", label: "Task" },

    { path: "agreedPerformance", label: "Agreed Perfomance Target" },
    { path: "performanceIndicator", label: "Perfomance Indicator" },
    { path: "selfScore", label: "Self Score" },

    {
      key: "targets",
      label: "Appraise Targets",
      content: (target) => (
        <OverlayTrigger
          overlay={<Tooltip id={`tooltip-top`}>Appraise Target</Tooltip>}
        >
          <Button variant="blue" onClick={() => appraiseTarget(target.id)}>
            {/* <i className="material-icons">&#xE254;</i> */}
            Score <MdCreditScore />
          </Button>
        </OverlayTrigger>
      ),
    },
  ];

  const HandleEdit = (target) => {};

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

export default SelfappraisalTable;
