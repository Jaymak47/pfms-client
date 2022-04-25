import React from "react";
import { Link } from "react-router-dom";

// import Table from "../../common/table";
import {
  Modal,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Table,
} from "react-bootstrap";
import AddSelfAppraisal from "./addselfAppraisal";
import TotalMeanScore from "./totalmeanscore";
import RatingScale from "./ratingscale";

const AppraisalTable = ({
  selfappraisal,
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

  // const columns = [
  //   {
  //     key: "count",
  //     label: "#",
  //     content: () => numbering++ - selfappraisal.length,
  //   },
  //   {
  //     path: "task.task.task",
  //     label: "Task",
  //     content: (task) => <Link to={`/task/:id${task._id}`}>{task.task}</Link>,
  //   },
  //   { path: "target", label: "Target" },
  //   {
  //     path: "performanceindicator.performanceindicator",
  //     label: "Peformance Indicator",
  //   },
  //   {
  //     path: "achievedresults",
  //     label: "Achieved Results",
  //   },
  //   { path: "scorerating", label: "Score Rating" },

  //   {
  //     key: "selfappraisal",
  //     label: "Actions",
  //     content: () => (
  //       <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
  //         <button
  //           onClick={handleShow}
  //           className="btn text-warning btn-act"
  //           data-toggle="modal"
  //         >
  //           <i className="material-icons">&#xE254;</i>
  //         </button>
  //       </OverlayTrigger>
  //     ),
  //   },
  // ];

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

  let total = 0;
  function computeTotalMean() {
    total = selfappraisal.map((item) => {
      return item.scorerating.reduce(
        (total, currentValue) => (total = total + parseInt(currentValue.item)),
        0
      );
    });

    // total = selfappraisal.scorerating.reduce(
    //   (total, currentValue) =>
    //     (total = total + parseInt(currentValue.scorerating)),
    //   0
    // );
    return total;
  }

  const totalScore = 140;
  let meanscore = 0;

  totalScore > 0 ? (meanscore = totalScore / 2) : (meanscore = 0);

  return (
    <div>
      {/* <Table
        columns={columns}
        data={selfappraisal}
        sortColumn={sortColumn}
        onSort={onSort}
        count={count}
        name={name}
      /> */}

      <Table striped bordered hover>
        <thead className="tablestyles">
          <tr>
            <th>Task</th>
            <th>Target</th>
            <th>Performance Indicator</th>
            <th>Achieved Results</th>
            <th>Score-Rating</th>
            <th>Supervisor Score</th>
            <th>Joint Score</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {selfappraisal.map((items) => (
            <tr>
              <td>
                {items.task.map((item) => (
                  <tr>
                    <td>{item.task}</td>
                  </tr>
                ))}
              </td>
              <td>
                {items.target.map((item) => (
                  <tr>
                    <td>{item.agreedperformance}</td>
                  </tr>
                ))}
              </td>
              <td>
                {items.target.map((item) => (
                  <tr>
                    <td>{item.performanceindicator}</td>
                  </tr>
                ))}
              </td>
              <td>
                {items.achievedresults.map((item) => (
                  <tr>
                    <td>{item}</td>
                  </tr>
                ))}
              </td>
              <td>
                {items.scorerating.map((item) => (
                  <tr>
                    <td>{item}</td>
                  </tr>
                ))}
              </td>
              <td>
                <tr>
                  <td>100</td>
                </tr>
                <tr>
                  <td>40</td>
                </tr>
              </td>
              <td>
                {items.task.map((item) => (
                  <tr>
                    <td>
                      <OverlayTrigger
                        overlay={<Tooltip id={`tooltip-top`}>Score</Tooltip>}
                      >
                        <Link
                          to={`/selfappraisal/${selfappraisal._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </td>
              <td>
                <tr>
                  <td>100</td>
                </tr>
                <tr>
                  <td>40</td>
                </tr>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col>
          <h3>Self Appraisal Score</h3>
          <TotalMeanScore totalScore={totalScore} meanscore={meanscore} />
          <h3>Supervisor ScoreRating</h3>
          <TotalMeanScore totalScore={totalScore} meanscore={meanscore} />
        </Col>
        <Col md="7">
          <RatingScale />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSelfAppraisal />
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

export default AppraisalTable;
